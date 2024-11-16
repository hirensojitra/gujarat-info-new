import { AfterViewInit, Component, ElementRef, Inject, OnInit, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { ImageElement, PostDetails } from '../../common/interfaces/image-element';
import { PostDetailService } from '../../common/services/post-detail.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SvgRectService } from '../../common/services/svg-rect.service';
import { SvgCircleService } from '../../common/services/svg-circle.service';
import { SvgEllipseService } from '../../common/services/svg-ellipse.service';
import { DevelopmentService } from '../../common/services/development.service';
import { PlatformService } from '../../common/services/platform.service';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../../common/services/toast.service';
import { LoaderService } from '../../common/services/loader';
import { FontService } from '../../common/services/fonts.service';
import { BaseUrlService } from '../../common/services/baseuri.service';
import { SEOService } from 'src/app/common/services/seo.service';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

interface MatchObject {
  components: string;
}
interface Subtable {
  substitutions: { [key: string]: boolean };
  match: MatchObject[];
}
interface FontStyles {
  [fontFamily: string]: Set<string>;
}


declare const bootstrap: any;
interface data {
  id: string;
  value: string;
  index: string;
  type: string;
  title: string;
  lang?: string;
  controlName?: string;
  dependency?: string;
  api?: string;
}
@Component({
  selector: 'app-poster',
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.scss']
})
export class PosterComponent implements OnInit {
  postDetailsDefault: PostDetails | undefined;
  postDetails: PostDetails | undefined;
  imgParam: string;
  isDeleted: boolean | undefined;
  postStatus: string | undefined = 'loading';
  dataset: data[] = [];
  apiData: { [key: string]: any[] } = {};
  selectData: { [key: string]: { lang: string, value: string, api: string, dependency: string, text: SVGAElement } } = {};

  selectedIndex: number | null = null;
  selectedID: string | null = null;

  inputTextForm: FormGroup;
  formData: FormGroup;
  inputImageForm: FormGroup;

  downloaded: boolean = false;
  canDownload: boolean = false;

  textModal: any;
  textModalTitle: string | undefined = '';

  myInfo: any;
  encodedText = encodeURIComponent("Hello, Hiren!\nI'm interested to create Poster Generate Link");
  cropperModal: any;
  imageCropper: any;
  selectedImage: string = '';
  baseUrl: string;
  finalImage: any;
  pageLink: string = '';

  @ViewChild('imageDraw') imageDraw!: ElementRef<SVGElement | HTMLElement>;
  @ViewChild('textInput') textInput!: ElementRef;
  @ViewChild('imageInput') imageInput!: ElementRef;

  imgModalTitle: string = '';
  cropper!: Cropper;
  cropperModalTitle: string | undefined = '';

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta,
    private PS: PostDetailService,
    private renderer: Renderer2,
    private Rect: SvgRectService,
    private Circle: SvgCircleService,
    private Ellipse: SvgEllipseService,
    private commonService: DevelopmentService,
    private fb: FormBuilder,
    private platformService: PlatformService,
    private http: HttpClient,
    private toastService: ToastService,
    private loaderService: LoaderService,
    private fontService: FontService,
    private elementRef: ElementRef,
    private baseUrlService: BaseUrlService,
    private seoService: SEOService,
    @Inject(PLATFORM_ID) private platformId: Object

  ) {
    this.inputTextForm = this.fb.group({
      text: ['', Validators.required]
    });
    this.inputImageForm = this.fb.group({
      image: ['']
    });
    this.formData = this.fb.group({});
    this.baseUrl = this.baseUrlService.getBaseUrl();
  }

  async ngOnInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      await this.route.paramMap.subscribe(async params => {
        this.imgParam = params.get('img');
        if (this.imgParam) {
          this.postDetailsDefault = await this.PS.getPostById(this.imgParam.toString()).toPromise() as PostDetails;
          if (this.postDetailsDefault && !this.postDetailsDefault.deleted) {
            this.getPostById();
            await this.changeMetadataDynamically();
          }
        }
      })
    }

    if (isPlatformServer(this.platformId)) {
      await this.seoService.initSEO();
      this.route.data.subscribe(async data => {
        this.titleService.setTitle(data['title'] || 'Poster Download');
        this.metaService.updateTag({ name: 'description', content: data['description'] || 'Discover our web application for generating election campaign posters, festival posts, and other promotional activities. Customize posters with photos, names, addresses, designations, and contact details for efficient and personalized promotional material.' });
        this.metaService.updateTag({ name: 'keywords', content: data['keywords'] || 'poster generation, campaign posters, election posters, festival posts, promotional activities, customization, PostNew, web application' });
        this.metaService.updateTag({ name: 'robots', content: data['robots'] || 'index, follow' });
        this.metaService.updateTag({ property: 'og:title', content: data['og:title'] || 'Default OG title' });
        this.metaService.updateTag({ property: 'og:description', content: data['og:description'] || 'Default OG description' });
        this.metaService.updateTag({ property: 'og:image', content: data['og:image'] || 'https://api.postnew.in/api/v1/img/uploads/wLmyK?quality=30' });
      })
      await this.route.paramMap.subscribe(async params => {
        this.imgParam = params.get('img');
        if (this.imgParam) {
          this.postDetailsDefault = await this.PS.getPostById(this.imgParam.toString()).toPromise() as PostDetails;
          if (this.postDetailsDefault && !this.postDetailsDefault.deleted) {
            await this.changeMetadataDynamically();
          }
        }
      });


    }
    await new Promise(resolve => setTimeout(resolve, 1500));

  }
  async changeMetadataDynamically(): Promise<void> {
    const {
      title = 'Default Title',
      info = 'Default Description',
      backgroundurl = 'https://api.postnew.in/api/v1/img/uploads/defaultImage',
      id = 'defaultID',

    } = this.postDetailsDefault || {};
    const author = 'Hiren Sojitra';
    const siteName = 'PostNew';
    const twitterUsername = '@Sojitra_Hiren';
    const imageUrl = `${backgroundurl}?quality=30`;
    const postUrl = `https://www.postnew.in/poster/${id}`;
    const locale = 'en_US';

    // Set the document title and description
    this.titleService.setTitle(title);
    this.metaService.updateTag({ name: 'description', content: info });

    // Open Graph metadata
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: info });
    this.metaService.updateTag({ property: 'og:image', content: imageUrl });
    this.metaService.updateTag({ property: 'og:url', content: postUrl });
    this.metaService.updateTag({ property: 'og:type', content: 'poster' }); // Assuming the content is an article
    this.metaService.updateTag({ property: 'og:site_name', content: siteName });
    this.metaService.updateTag({ property: 'og:locale', content: locale });

    // Additional article-specific Open Graph tags
    this.metaService.updateTag({ property: 'article:author', content: author });

    // Twitter metadata
    this.metaService.updateTag({ property: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ property: 'twitter:url', content: postUrl });
    this.metaService.updateTag({ property: 'twitter:title', content: title });
    this.metaService.updateTag({ property: 'twitter:description', content: info });
    this.metaService.updateTag({ property: 'twitter:image', content: imageUrl });
    this.metaService.updateTag({ property: 'twitter:site', content: twitterUsername });
    this.metaService.updateTag({ property: 'twitter:creator', content: twitterUsername });

    // Canonical URL (SEO best practice)
    this.metaService.updateTag({ rel: 'canonical', href: postUrl });
  }

  async getPostById(): Promise<void> {
    const post: PostDetails = this.postDetailsDefault;
    if (!post) return;
    try {
      this.postDetails = post;
      const p = JSON.parse(JSON.stringify(post));
      this.isDeleted = post.deleted;

      if (!post.deleted) {
        this.postStatus = 'loading';
        try {
          const bg = await this.getImageDataUrl(post.backgroundurl);
          post.backgroundurl = bg;
        } catch (err) {
          console.error('Error fetching background image URL:', err);
        }

        // Handle images in post.data
        for (const item of post.data) {
          if (item.image && item.image.imageUrl) {
            try {
              item.image.imageUrl = await this.getImageDataUrl(item.image.imageUrl);
            } catch (err) {
              console.error('Error fetching image URL:', err);
            }
          }
        }

        // Update post status with download counter
        if (this.postDetails.download_counter) {
          this.postStatus = 'Total Download: ' + this.postDetails.download_counter;
        } else {
          this.postStatus = 'No download counter available';
        }

        // Initialize post UI
        this.initialize();

      } else if (post.deleted && post.msg) {
        this.postStatus = post.msg;
      }
    } catch (error) {
      console.error('Error in getPostById:', error);
      this.postStatus = 'Error loading post';
    }
    this.textModal = new bootstrap.Modal(document.getElementById('textModal')!, { focus: false, keyboard: false, static: false });
    this.textModal._element.addEventListener('hide.bs.modal', () => { this.inputTextForm.reset(); });
    this.textModal._element.addEventListener('show.bs.modal', () => { });
    this.textModal._element.addEventListener('shown.bs.modal', () => { this.textInput.nativeElement.focus(); });
    this.myInfo = new bootstrap.Modal(document.getElementById('myInfo')!, { focus: false, keyboard: false, static: false });
    this.cropperModal = new bootstrap.Modal(document.getElementById('cropperModal')!, { focus: false, keyboard: false, static: false });
    this.cropperModal._element.addEventListener('hide.bs.modal', () => { if (this.cropper) { this.cropper.destroy(); } });
    this.cropperModal._element.addEventListener('show.bs.modal', () => { });
    this.imageCropper = new bootstrap.Modal(document.getElementById('imageCropper')!, { focus: false, keyboard: false, static: false });
    this.imageCropper._element.addEventListener('hide.bs.modal', () => { if (this.cropper) { this.cropper.destroy(); } });
    this.imageCropper._element.addEventListener('show.bs.modal', () => { });
  }
  async getImageDataUrl(imageUrl: string): Promise<string> {
    try {
      // Fetch the image
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      // Convert the blob to a data URL
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error fetching or converting image:', error);
      throw error;
    }
  }
  async initialize(): Promise<void> {
    try {
      await Promise.all([this.drawSVG(), this.buildForm()]);
    } catch (error) {
      console.error('An error occurred during initialization:', error);
    }
  }
  async drawSVG() {
    if (this.postDetails) {
      const backgroundurl = this.postDetails.backgroundurl;
      const svg = this.imageDraw.nativeElement;
      const svgDefs = document.createElementNS('http://www.w3.org/2000/svg', 'defs') as SVGDefsElement;
      while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
      }
      const linkElement = document.createElementNS('http://www.w3.org/2000/svg', 'link');
      linkElement.setAttribute('rel', 'stylesheet');
      linkElement.setAttribute('href', 'https://fonts.googleapis.com/css2?family=Anek+Gujarati:wght@100..800&family=Baloo+Bhai+2:wght@400..800&family=Farsan&family=Hind+Vadodara:wght@300;400;500;600;700&family=Kumar+One&family=Kumar+One+Outline&family=Mogra&family=Mukta+Vaani:wght@200;300;400;500;600;700;800&family=Noto+Sans+Gujarati:wght@100..900&family=Noto+Serif+Gujarati:wght@100..900&family=Rasa:ital,wght@0,300..700;1,300..700&family=Shrikhand&display=swap');

      // Append the <link> element to the SVG's <defs> element
      svgDefs.appendChild(linkElement);
      svg.appendChild(svgDefs);
      this.renderer.setAttribute(svg, 'viewBox', "0 0 " + (this.postDetails.w || 0) + " " + (this.postDetails.h || 0));
      const b = this.renderer.createElement('image', 'http://www.w3.org/2000/svg');
      this.renderer.setAttribute(b, 'x', '0');
      this.renderer.setAttribute(b, 'y', '0');
      this.renderer.setAttribute(b, 'width', '100%'); // Set width to 100%
      this.renderer.setAttribute(b, 'height', '100%'); // Set height to 100%
      this.renderer.setAttribute(b, 'preserveAspectRatio', 'xMidYMid slice'); // Use slice to cover and maintain aspect ratio
      this.renderer.setAttribute(b, 'href', backgroundurl);
      this.renderer.appendChild(svg, svgDefs);
      this.renderer.appendChild(svg, b);
      let s = 0;
      this.postDetails?.data.forEach(async (item, i) => {
        const uniqueId = item.editable ? this.dataset[s]?.id || Math.random().toString(36).substr(2, 9) : Math.random().toString(36).substr(2, 9);
        switch (true) {
          case !!item.text:
            if (item.text) {
              const t = this.renderer.createElement('text', 'http://www.w3.org/2000/svg');
              let { x, y, fs, fw, text, type, controlName, api, lang, dependency, color, fontStyle, rotate, fontFamily, textShadow, backgroundColor, textEffects, textAnchor, alignmentBaseline, letterSpacing, lineHeight, textTransformation, originX, originY, opacity } = item.text;
              if (text) {
                const lines = this.textFormat(text);
                item.editable && this.renderer.setStyle(t, 'pointer-events', 'none');
                if (lines.length === 1) {
                  const textElement = this.renderer.createText(text)
                  if (controlName && lang && type && type == "select") {
                    this.selectData[controlName] = {
                      lang: lang,
                      value: text,
                      api: api as string,
                      dependency: dependency || 'none',
                      text: textElement,
                    }
                  }
                  this.renderer.appendChild(t, textElement);
                } else {
                  // Calculate dy offset based on font size
                  const dyOffset = fs * lineHeight || 0;

                  // Calculate dx offset based on text-anchor
                  let dxOffset = 0;
                  switch (textAnchor) {
                    case 'middle':
                      // For middle alignment, calculate the total width of the text and divide by 2
                      const totalWidth = lines.reduce((sum, line) => sum + this.getTextWidth(line, fs, fontFamily), 0);
                      dxOffset = totalWidth / 2;
                      break;
                    case 'end':
                      // For end alignment, calculate the total width of the text
                      dxOffset = lines.reduce((maxWidth, line) => {
                        const lineWidth = this.getTextWidth(line, fs, fontFamily);
                        return lineWidth > maxWidth ? lineWidth : maxWidth;
                      }, 0);
                      break;
                    // For start alignment, dxOffset remains 0
                  }
                  // Iterate over each line of text
                  lines.forEach((line, index) => {
                    // Create a tspan element for each line
                    const tspanElement = this.renderer.createElement('tspan', 'http://www.w3.org/2000/svg');

                    // Set text content
                    this.renderer.appendChild(tspanElement, this.renderer.createText(line));

                    // Apply dy offset
                    if (index > 0 || (index === 0 && line.trim() === '')) {
                      this.renderer.setAttribute(tspanElement, 'dy', `${dyOffset}px`);
                    }
                    this.renderer.setAttribute(tspanElement, 'x', x.toString());
                    // Apply dx offset based on text-anchor
                    switch (textAnchor) {
                      case 'middle':
                        // For middle alignment, set dx to half of the total width
                        this.renderer.setAttribute(tspanElement, 'dx', `-${dxOffset}px`);
                        break;
                      case 'end':
                        // For end alignment, set dx to the total width
                        this.renderer.setAttribute(tspanElement, 'dx', `-${dxOffset}px`);
                        break;
                      // For start alignment, dx remains 0
                    }

                    // Append tspan to text element
                    this.renderer.appendChild(t, tspanElement);
                  });
                }
              }

              // switch (fontFamily) {
              //   case "Hind Vadodara":
              //     let f = "Hind_Vadodara/"
              //     let a: boolean = false;
              //     switch (fw) {
              //       case '300':
              //         f += 'HindVadodara-Light';
              //         a = true;
              //         break;
              //       case '400':
              //         f += 'HindVadodara-Regular';
              //         a = true;
              //         break;
              //       case '500':
              //         f += 'HindVadodara-Medium';
              //         a = true;
              //         break;
              //       case '600':
              //         f += 'HindVadodara-SemiBold';
              //         a = true;
              //         break;
              //       case '700':
              //         f += 'HindVadodara-Bold';
              //         a = true;
              //         break;

              //       default:
              //         break;
              //     }
              //     if (a) { fontLink = f }

              //     break;

              //   default:
              //     break;
              // }

              let textAttributes: Record<string, string> = {
                'data-type': 'text',
                'x': x.toString(),
                'y': y.toString(),
                'font-size': fs.toString(),
                'fill': color || '#000000', // Set default fill color to black if not provided
                'text-anchor': textAnchor || 'start',
                'alignment-baseline': alignmentBaseline || 'middle',
                'dominant-baseline': 'reset-size',
                'font-family': fontFamily ? "'" + fontFamily + "', sans-serif" : "'Hind Vadodara', sans-serif",
                'font-weight': fw || 'normal',
                'text-decoration': fontStyle.underline ? 'underline' : 'none',
                'font-style': fontStyle.italic ? 'italic' : 'normal',
                'opacity': opacity ? opacity.toString() : '100',
              };
              if (backgroundColor) {
                textAttributes['background-color'] = backgroundColor;
              }
              if (textEffects) {

              }
              // Apply other text styles
              let textStyles: Record<string, string> = {
                '-webkit-user-select': 'none',
                'letter-spacing': letterSpacing ? `${letterSpacing}px` : 'normal',
                'line-height': lineHeight ? `${lineHeight}` : 'normal',
                'text-transform': textTransformation || 'none'
              };
              if (textShadow.enable) {
                textAttributes['filter'] = `drop-shadow(${textShadow.offsetX}px ${textShadow.offsetY}px ${textShadow.blur}px ${textShadow.color})` || 'none'
              }
              Object.entries(textAttributes).forEach(([key, value]) => this.renderer.setAttribute(t, key, value));
              Object.entries(textStyles).forEach(([key, value]) => this.renderer.setStyle(t, key, value));

              this.renderer.setAttribute(t, 'data-id', uniqueId);
              if (rotate || (originX !== undefined && originY !== undefined)) {
                const bbox = t.getBBox();
                const width = bbox.width;
                const height = bbox.height;
                const transformValue = `rotate(${rotate || 0} ${x + width / 2} ${y + height / 2})`;
                this.renderer.setAttribute(t, 'transform', transformValue);
              }
              if (this.dataset[s] == undefined && item.editable) { this.dataset.push({ id: uniqueId, lang: lang || 'en', value: text || 'Select ' + item.title + '', index: i.toString(), type: type, title: item.title, controlName: controlName, api: api, dependency: dependency }); }
              this.renderer.appendChild(svg, t);
              this.renderer.addClass(t, 'pointer-events-none');
              item.editable && this.renderer.listen(t, 'click', () => {
                this.selectedIndex = i;
                this.selectedID = uniqueId;
                this.setText();
              });
              // const fontLink = this.getFontPath(fontFamily, fw) || 'Hind_Vadodara/HindVadodara-Regular';
              // await this.loadFont(`assets/fonts/${fontLink}.ttf`)
              if (item.editable) {
                s++;
              } else {
              }
            }
            break;
          case !!item.rect:
            if (item.rect) {
              const rect = this.Rect.createRect(item.rect);
              this.renderer.appendChild(svg, rect);
              return rect;
            }
            break;
          case !!item.circle:
            if (item.circle) {
              const c = this.Circle.createCircle(item.circle);
              this.renderer.appendChild(svg, c);
              return c;
            }
            break;
          case !!item.ellipse:
            if (item.ellipse) {
              const e = this.Ellipse.createEllipse(item.ellipse);
              this.renderer.appendChild(svg, e);
              return e;
            }
            break;
          case !!item.image:
            if (item.image) {
              const { x, y, r, imageUrl, borderColor, borderWidth, shape, origin, placeholder, svgProperties, rotate } = item.image;
              const { w, h } = this.commonService.calculateWH(item.image)
              let element: any;
              switch (shape) {
                case 'circle':
                  element = this.renderer.createElement('circle', 'http://www.w3.org/2000/svg');
                  this.renderer.setAttribute(element, 'cx', String(x));
                  this.renderer.setAttribute(element, 'cy', String(y));
                  this.renderer.setAttribute(element, 'r', String(r));
                  this.renderer.setAttribute(element, 'data-type', 'circle');
                  break;
                case 'ellipse':
                  element = this.renderer.createElement('ellipse', 'http://www.w3.org/2000/svg');
                  this.renderer.setAttribute(element, 'cx', String(x));
                  this.renderer.setAttribute(element, 'cy', String(y));
                  this.renderer.setAttribute(element, 'rx', String(r));
                  this.renderer.setAttribute(element, 'ry', String(r));
                  this.renderer.setAttribute(element, 'data-type', 'ellipse');
                  break;
                case 'rect':
                case 'rect_3_2':
                case 'rect_4_3':
                case 'rect_16_9':
                case 'rect_1_1':
                case 'rect_5_4':
                case 'rect_3_1':
                case 'rect_7_5':
                case 'rect_2_3':
                case 'rect_3_4':
                case 'rect_9_16':
                case 'rect_4_5':
                case 'rect_5_7':
                  element = this.renderer.createElement('rect', 'http://www.w3.org/2000/svg');
                  this.renderer.setAttribute(element, 'x', String(x)); // X coordinate
                  this.renderer.setAttribute(element, 'y', String(y)); // Y coordinate
                  this.renderer.setAttribute(element, 'width', String(w)); // Width
                  this.renderer.setAttribute(element, 'height', String(h)); // Height
                  this.renderer.setAttribute(element, 'data-type', 'rect');
                  this.renderer.setAttribute(element, 'fill', '#FFF');
                  break;
                default:
                  console.error('Invalid shape');
                  return null;
              }
              if (element !== null) {
                // Set common attributes for all shapes
                const id = uniqueId;
                this.renderer.addClass(element, 'pointer-events-none');
                this.renderer.setAttribute(element, 'fill', 'url(#' + id + ')');
                item.editable && this.renderer.setStyle(element, 'pointer-events', 'none');
                this.renderer.setStyle(element, 'filter', 'url(#shadow)');
                const imagePattern = this.renderer.createElement('pattern', 'http://www.w3.org/2000/svg');
                this.renderer.setAttribute(imagePattern, 'id', id);
                this.renderer.setAttribute(imagePattern, 'x', '0');
                this.renderer.setAttribute(imagePattern, 'y', '0');
                this.renderer.setAttribute(imagePattern, 'height', '100%');
                this.renderer.setAttribute(imagePattern, 'width', '100%');
                this.renderer.setAttribute(imagePattern, 'viewBox', '0 0 ' + String(w) + ' ' + String(h));
                this.renderer.setAttribute(element, 'data-id', uniqueId);
                if (this.dataset[s] == undefined && item.editable) { this.dataset.push({ id: uniqueId, value: '', index: i.toString(), type: 'image', title: item.title }); }
                item.editable && this.renderer.listen(element, 'click', () => {
                  this.selectedIndex = i;
                  this.selectedID = uniqueId;
                  this.setImage();
                });
                const image = this.renderer.createElement('image', 'http://www.w3.org/2000/svg');
                this.renderer.setAttribute(image, 'x', '0');
                this.renderer.setAttribute(image, 'y', '0');
                this.renderer.setAttribute(image, 'width', String(w));
                this.renderer.setAttribute(image, 'height', String(h));
                this.renderer.setAttribute(image, 'href', imageUrl);

                const extraRect = this.renderer.createElement('rect', 'http://www.w3.org/2000/svg');
                this.renderer.setAttribute(extraRect, 'x', '0'); // X coordinate
                this.renderer.setAttribute(extraRect, 'y', '0'); // Y coordinate
                this.renderer.setAttribute(extraRect, 'width', String(w)); // Width
                this.renderer.setAttribute(extraRect, 'height', String(h)); // Height
                this.renderer.setAttribute(extraRect, 'fill', '#FFFFFF');

                item.editable && this.renderer.appendChild(imagePattern, extraRect);

                this.renderer.appendChild(imagePattern, image);
                this.renderer.appendChild(svg, imagePattern);

                // Apply border if needed
                if (borderWidth && borderColor) {
                  this.renderer.setAttribute(element, 'stroke', borderColor);
                  this.renderer.setAttribute(element, 'stroke-width', String(borderWidth));
                }

                // Apply SVG properties if provided
                // if (svgProperties) {
                //   Object.keys(svgProperties).forEach(key => {
                //     const propertyKey = key as keyof SvgProperties;
                //     const attributeValue = svgProperties[propertyKey];
                //     this.renderer.setAttribute(element!, propertyKey, String(attributeValue));
                //   });
                // }
                this.renderer.appendChild(svg, element);
                if (rotate || (x !== undefined && y !== undefined)) {
                  const bbox = element.getBBox();
                  const width = bbox.width;
                  const height = bbox.height;
                  const transformValue = `rotate(${rotate || 0} ${x + width / 2} ${y + height / 2})`;
                  this.renderer.setAttribute(element, 'transform', transformValue);
                }
                if (item.editable) {
                  s++;
                } else {
                }
                return element as any;
              }
            }
            break;
          default:
            console.log('Element data not found');
            break;
        }
      })
    }
    this.downloaded = false;
    this.canDownload = false;
    this.formData.reset({}, { emitEvent: false });

    for (const key in this.selectData) {
      const data = this.selectData[key];
      if (data.dependency === 'none') {
        await this.loadData(key, data.api);
      } else {
        await this.setupDependency(key, data);
      }
      const filteredData = this.apiData[key].filter(item => item.id == data.value);
      if (filteredData.length) {
        this.renderer.setValue(data.text, filteredData[0][data.lang == 'gu' ? 'gu_name' : 'name'])
      }
    }
  }
  async buildForm() {
    Object.keys(this.formData.controls).forEach(key => {
      this.formData.get(key) && this.formData.removeControl(key);
    });
    const selectData: { [key: string]: { title: string, control: FormControl, api: string, dependency: string } } = {};
    this.dataset.forEach(field => {
      const index = parseInt(field.index, 10);
      if (!isNaN(index) && this.postDetails?.data) {
        if (field.type === 'text') {
          const textData = this.postDetails.data.filter((_, i) => i === index)[0]?.text;
          if (textData) {
            this.formData.addControl(field.id, this.fb.control('', Validators.required));
            this.formData.get(field.id)?.valueChanges.subscribe((v) => {
              textData.text = v;
              field.value = v;
            });
          }
        } else if (field.type === 'select') {
          const textData = this.postDetails.data.filter((_, i) => i === index)[0]?.text;
          if (textData) {
            const c = this.formData.addControl(field.id, this.fb.control(field.value, Validators.required));
            this.formData.get(field.id)?.valueChanges.subscribe((v) => {
              textData.text = v;
              field.value = v;
            });
            if (field.dependency && field.controlName && field.api) {
              selectData[field.controlName] = {
                title: field.title,
                control: this.formData.get(field.id) as FormControl,
                api: field.api,
                dependency: field.dependency,
              }
            }
          }
        } else if (field.type === 'image') {
          const textData = this.postDetails.data.filter((_, i) => i === index)[0]?.image;
          if (textData) {
            this.formData.addControl(field.id, this.fb.control('', Validators.required));
            this.formData.addControl(field.id + '-file', this.fb.control('', Validators.required));
            this.formData.get(field.id)?.valueChanges.subscribe((v) => {
              textData.imageUrl = v;
              field.value = v;
            });
          }
        }
      }
    });
    for (const key in selectData) {
      const s = selectData[key];
      // Ensure the dependency exists and has a control
      if (
        selectData[key].dependency !== 'none' &&
        selectData[key].dependency in selectData && // Check if dependency exists in selectData
        selectData[selectData[key].dependency].control // Ensure control exists
      ) {
        selectData[selectData[key].dependency].control.valueChanges.subscribe(async (value) => {
          if (value) {
            const dependentApi = `${s.api}${value}`;
            await this.fetchDataFromAPI(dependentApi, key);
          }
        });
      } else {
        console.warn(`Dependency "${selectData[key].dependency}" for "${key}" is invalid or not found.`);
      }
    }

  }
  textFormat(text: string): string[] {
    const formattedText = text.replace(/\n/g, '\n').replace(/\n(?!\*{3})/g, '***\n');
    const lines = formattedText.split('\n');
    for (let i = 0; i < lines.length; i++) {
      lines[i] = lines[i].replace(/\*\*\*/g, '\u00A0');
    }
    return lines;
  }
  getTextWidth(text: string, fontSize: number, fontFamily: string): number {
    const svgText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    svgText.setAttribute('font-size', `${fontSize}px`);
    svgText.setAttribute('font-family', `fontFamily`);
    svgText.textContent = text;
    document.body.appendChild(svgText);
    const width = svgText.getBBox().width;
    document.body.removeChild(svgText);
    return width;
  }
  setText() {
    this.inputTextForm.reset();
    const i = this.selectedIndex;
    if (i !== null) {
      const t = this.postDetails?.data[i].text?.text;
      const dt = this.postDetailsDefault?.data[i].text?.text;
      let v = (t == dt) ? '' : t;
      this.inputTextForm.get('text')?.setValue(v);
      this.textInput.nativeElement.placeholder = dt;
      this.textModalTitle = this.postDetails?.data[i].title || undefined;
      this.textModal.show();
    }
  }
  setImage() {
    this.inputImageForm.reset();
    const i = this.selectedIndex;
    if (i !== null) {
      const t = this.postDetails?.data[i].image?.imageUrl;
      const dt = this.postDetailsDefault?.data[i].image?.imageUrl;
      let v = (t == dt) ? dt : t;
      this.inputImageForm.get('image')?.setValue(v);
      this.cropperModalTitle = this.postDetails?.data[i].title || undefined;
      this.cropperModal.show();
    }
  }
  private async loadData(key: string, api: string) {
    if (!this.apiData[key]) {
      await this.fetchDataFromAPI(api, key);
    }
  }
  private async setupDependency(key: string, data: { lang: string, value: string, api: string, dependency: string }) {
    if (!data.api.endsWith('/')) {
      data.api += '/';
    }
    const dependencyKey = data.dependency;
    const dependencyControl = this.selectData[dependencyKey].value;
    const dependentApi = `${data.api}${dependencyControl}`;
    await this.fetchDataFromAPI(dependentApi, key);
  }
  async fetchDataFromAPI(apiUrl: string, controlName: string): Promise<void> {
    try {
      const id = this.getIdByControlName(controlName);
      const data = await this.http.get<any[]>(apiUrl).toPromise();
      if (controlName && data) { this.apiData[controlName] = data;} else { this.apiData[controlName] = [] }
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  }
  async onSubmitFormData() {
    this.commonService.markFormGroupTouched(this.formData);
    if (this.formData.valid) {
      this.dataset.forEach(field => {
        const index = parseInt(field.index, 10);
        if (!isNaN(index) && this.postDetails?.data) {
          if (field.type === 'text') {
            const textData = this.postDetails.data.filter((_, i) => i === index)[0]?.text;
            if (textData) {
              textData.text = field.value;
              this.canDownload = false;
            }
          } else if (field.type === 'image') {
            const imageData = this.postDetails.data.filter((_, i) => i === index)[0]?.image;
            if (imageData) {
              imageData.imageUrl = field.value;
              this.canDownload = false;
            }
          }
        }
      });
      await this.drawSVG();
      this.canDownload = true;
      this.formData.reset({}, { emitEvent: false });

    }
  }
  onFileChange(event: any, fieldName: string, index: string): void {
    const i = parseInt(index, 10)
    if (event.target.files.length > 0) {

      const file = event.target.files[0];
      const fileType = file.type;
      if (fileType.startsWith('image/')) {
        if (fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/gif' || fileType === 'image/bmp' || fileType === 'image/webp' || fileType === 'image/svg+xml' || fileType === 'image/tiff') {
          const reader = new FileReader();
          reader.onload = (e) => {
            const imageSrc = e.target?.result as string;
            this.imageCropper.show();
            // Initialize Cropper
            const imageData = this.postDetails?.data[i].image;
            let h = 320;
            let w = 320;
            let cH = 320;
            let cW = 320;
            if (this.postDetails?.data[i].image) {
              const newWH = this.commonService.calculateWH(imageData as ImageElement)
              w = newWH.w;
              h = newWH.h;
            }
            const cropperElement = document.getElementById('imageToCropped') as HTMLImageElement;
            this.cropper = new Cropper(cropperElement, {

              scalable: true,
              viewMode: 3,
              crop: (event) => {

              },
              autoCropArea: 1, // Ensure the initial crop area covers the entire image
              dragMode: 'move', // Allow dragging to move the image within the container
              responsive: true, // Update crop box on resize
              cropBoxResizable: false, // Disable resizing the crop box
              minCropBoxWidth: cW,
              minCropBoxHeight: cH,
              minContainerWidth: 320,
              minContainerHeight: 320,
              aspectRatio: w / h
            });
            this.cropper.replace(imageSrc);
            this.selectedImage = fieldName;
          };
          reader.readAsDataURL(file);

        } else {
          this.toastService.show('Please select image type.', { class: 'bg-danger', title: 'Invalid Image Type' });
        }
      } else {
        this.toastService.show('Please select valid file format.', { class: 'bg-danger', title: 'Invalid File Format' });
      }


    }
  }
  resetForm() {
    this.canDownload = false;
    this.formData.reset({}, { emitEvent: false });

  }
  async checkDownload(t: string): Promise<boolean> {
    const baseUrl = `${this.baseUrl}poster/${this.postDetails?.id}`;
    const title = this.postDetails?.title.trim();
    const info = this.postDetails?.info.trim();
    switch (t) {
      case 'download':
        this.capturePhoto();
        break;
      case 'whatsapp':
        const whatsappUrl = `*${baseUrl}*\n\n*${title}*\n*_${info}_*\n\nપોસ્ટર બનાવવા ઉપરની લિંક ક્લિક કરો\nઅન્ય સબંધિત વ્યક્તિ ને પણ શેર કરો.`;
        window.location.href = `whatsapp://send?text=${encodeURIComponent(whatsappUrl)}`;
        break;
      case 'facebook':
        const q = this.postDetails?.title + " " + this.postDetails?.info;
        const shareDialogUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(baseUrl)}&quote=${encodeURIComponent(q)}`;
        window.open(shareDialogUrl, '_blank');
        break;
      default:
        this.capturePhoto();
        break;
    }
    return true
  }
  async capturePhoto(share?: boolean) {
    this.loaderService.show(0);
    const svgElement = this.imageDraw.nativeElement;
    const viewBoxAttr = svgElement.getAttribute('viewBox') || '';
    const viewBoxValues = viewBoxAttr.split(' ').map(Number);
    const viewBoxWidth = viewBoxValues[2];
    const viewBoxHeight = viewBoxValues[3];

    // Create a new canvas element
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Set canvas dimensions to match the viewBox dimensions
    canvas.width = viewBoxWidth;
    canvas.height = viewBoxHeight;
    const image = new Image();

    // Create a new XMLSerializer object to serialize the SVG element
    const serializer = new XMLSerializer();

    const fontFamilies = this.getFontStylesFromSVG(svgElement);
    await this.loadFonts(fontFamilies);
    const svgString = serializer.serializeToString(svgElement);
    image.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString)));
    image.onload = async () => {
      context?.drawImage(image, 0, 0);
      const dataURL = canvas.toDataURL('image/png');
      const timestamp = new Date().toISOString().replace(/:/g, '-');
      const fileName = `IMG-${timestamp}.png`;
      const link = document.createElement('a');
      link.href = dataURL;
      this.finalImage = dataURL;
      link.download = fileName;
      const textElements = svgElement.querySelectorAll('text');
      context && textElements.forEach(text => {
        const fontFamily = text.getAttribute('font-family') || 'Arial'; // Default to Arial if font-family is not specified
        const fontSize = parseFloat(text.getAttribute('font-size') || '16'); // Default font size to 16 if not specified
        context.font = `${fontSize}px ${fontFamily}`;
      });
      this.downloaded = true;
      !share && link.click();
      await this.PS.updateDownloadCounter(this.imgParam)
        .subscribe(
          post => {
            if (post) {
              const p = JSON.parse(JSON.stringify(post));
              this.postStatus = 'Total Download: ' + post.download_counter;
              this.resetForm();
            } else {

            }
          },
          error => {
            this.postStatus = undefined;
            console.error('Error fetching post:', error);
          }
        )
      this.loaderService.hide();
    };
  }
  getFontStylesFromSVG(svgElement: SVGElement | HTMLElement): FontStyles {
    const textElements = svgElement.querySelectorAll('text');
    const fontStyles: FontStyles = {}; // Initialize as an empty object
    textElements.forEach(text => {
      const fontFamily = text.getAttribute('font-family');
      const fontWeight = text.getAttribute('font-weight') || 'normal'; // Default to 'normal' if font-weight is not specified
      if (fontFamily) {
        // Extract font family name from the attribute value
        const fontFamilyName = fontFamily.split(',')[0].replace(/['"]/g, '').trim(); // Remove single or double quotes and extra spaces
        if (!fontStyles[fontFamilyName]) {
          fontStyles[fontFamilyName] = new Set<string>();
        }
        fontStyles[fontFamilyName].add(fontWeight);
      }
    });
    return fontStyles;
  }
  async loadFonts(fontStyles: FontStyles) {
    const svg = this.imageDraw.nativeElement;
    let svgDefs = svg.querySelector('defs') as SVGDefsElement || svg.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'defs'));

    let styleElement = svgDefs.querySelector('style') as any | null;
    if (!styleElement) {
      styleElement = document.createElementNS('http://www.w3.org/2000/svg', 'style');
      svgDefs.appendChild(styleElement);
    }

    const addedRules = new Set<string>();

    for (const [fontFamily, fontWeights] of Object.entries(fontStyles)) {
      for (const fontWeight of fontWeights) {
        const fontPath = this.fontService.getFontPath(fontFamily, fontWeight);
        const fontData = await this.loadFontAsBase64(`assets/fonts/${fontPath}.ttf`);
        const fontFaceRule = `@font-face {
          font-family: '${fontFamily}';
          font-style: normal;
          font-weight: ${fontWeight};
          font-stretch: 100%;
          font-display: swap;
          src: url(data:font/truetype;base64,${fontData}) format('truetype');
        }`;

        if (!addedRules.has(fontFaceRule)) {
          styleElement.textContent += fontFaceRule;
          addedRules.add(fontFaceRule);
        }
      }
    }
  }
  async loadFontAsBase64(fontUrl: string): Promise<string> {
    const response = await fetch(fontUrl);
    const fontData = await response.arrayBuffer();
    return btoa(new Uint8Array(fontData).reduce((data, byte) => data + String.fromCharCode(byte), ''));
  }
  shareOnFacebook(): void {
    // Call FB.ui to trigger the Feed Dialog
    (window as any).FB.ui({
      method: 'feed',
      link: this.pageLink
    });
  }
  async onTextSubmit() {
    if (this.selectedIndex !== null && this.postDetails?.data) {
      this.postDetails.data = this.postDetails.data.map((item, index) => {
        if (index === this.selectedIndex && item.text) {
          let v = this.inputTextForm.get('text')?.value;
          if (this.selectedID) {
            const elementToChange = this.elementRef.nativeElement.querySelector(`[data-id="${this.selectedID}"]`);
            if (elementToChange) {
              const filteredItems = this.dataset.filter(item => item.id === this.selectedID);
              if (filteredItems[0]) {
                filteredItems[0].value = v || item.text.text;
              }
            }
          }
          return { ...item, text: { ...item.text, text: v } };
        }
        return item;
      });
    }
    await this.drawSVG();
    this.textModal.hide();
  }
  handleImageInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];
    if (file) {
      const fileType = file.type;
      if (fileType.startsWith('image/')) {
        // The file is an image
        if (fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/gif' || fileType === 'image/bmp' || fileType === 'image/webp' || fileType === 'image/svg+xml' || fileType === 'image/tiff') {

          const reader = new FileReader();
          reader.onload = (e) => {
            const imageSrc = e.target?.result as string;
            // Open Bootstrap modal dialog with Cropper
            const selectedItem = this.dataset.find(item => item.id === this.selectedImage);
            let w = 320;
            let h = 320;
            let cW = 320;
            let cH = 320;
            if (selectedItem) {
              const index = parseInt(selectedItem.index, 10);
              if (this.postDetails?.data[index].image) {
                const newWH = this.commonService.calculateWH(this.postDetails?.data[index].image as ImageElement)
                w = newWH.w;
                h = newWH.h;
              }
            }
            this.cropperModal.show();
            // Initialize Cropper
            const cropperElement = document.getElementById('cropper') as HTMLImageElement;
            this.cropper = new Cropper(cropperElement, {

              scalable: true,
              viewMode: 3, // Ensure the crop box is always within the container
              crop: (event) => {

              },
              autoCropArea: 1, // Ensure the initial crop area covers the entire image
              dragMode: 'move', // Allow dragging to move the image within the container
              responsive: true, // Update crop box on resize
              cropBoxResizable: false, // Disable resizing the crop box
              minCropBoxWidth: cW,
              minCropBoxHeight: cH,
              minContainerWidth: 320,
              minContainerHeight: 320,
              aspectRatio: w / h
            });
            this.cropper.replace(imageSrc);
          };
          reader.readAsDataURL(file);

        } else {
          this.toastService.show('Please select image type.', { class: 'bg-danger', title: 'Invalid Image Type' });
        }
      } else {
        this.toastService.show('Please select valid file format.', { class: 'bg-danger', title: 'Invalid File Format' });
      }
    }

    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) { } else {
    }
  }
  async onImageSubmit() {
    this.handleCropEvent()
    if (this.selectedIndex !== null && this.postDetails?.data) {
      this.postDetails.data = this.postDetails.data.map((item, index) => {
        if (index === this.selectedIndex && item.image) {
          let v = this.inputImageForm.get('image')?.value;
          if (this.selectedID) {
            const elementToChange = this.elementRef.nativeElement.querySelector(`[data-id="${this.selectedID}"]`);
            if (elementToChange) {
              const filteredItems = this.dataset.filter(item => item.id === this.selectedID);
              if (filteredItems[0]) {
                filteredItems[0].value = v || item.image.imageUrl;
              }
            }
          }
          return { ...item, image: { ...item.image, imageUrl: v } };
        }
        return item;
      });
    }
    await this.drawSVG();
    this.cropperModal.hide();
  }
  handleCropEvent(): void {
    if (this.cropper) {
      const selectedItem = this.dataset.find(item => item.id === this.selectedImage);
      let w = 800;
      let h = 800;
      if (selectedItem) {
        const index = parseInt(selectedItem.index, 10);
        if (this.postDetails?.data[index].image) {
          const newWH = this.commonService.calculateWH(this.postDetails?.data[index].image as ImageElement)
          w = newWH.w;
          h = newWH.h;
        }
      }
      const croppedCanvas = this.cropper.getCroppedCanvas();
      const resizedCanvas = document.createElement('canvas');
      const resizedContext = resizedCanvas.getContext('2d')!;
      resizedCanvas.width = w;
      resizedCanvas.height = h;
      resizedContext.drawImage(croppedCanvas, 0, 0, w, h);
      const resizedImageData = resizedCanvas.toDataURL('image/png'); // Adjust format as needed
      this.inputImageForm.get('image')?.setValue(resizedImageData);
    }
  }
  openImageCropperDialog(): void {
    const inputElement = this.imageInput.nativeElement;
    if (inputElement) {
      inputElement.click(); // Trigger click on the hidden file input
      inputElement.value = null;
    }
    this.cropperModal.hide();
  }
  handleSelectedEvent(): void {
    if (this.cropper) {
      const selectedItem = this.dataset.find(item => item.id === this.selectedImage);
      let w = 800;
      let h = 800;
      if (selectedItem) {
        const index = parseInt(selectedItem.index, 10);
        if (this.postDetails?.data[index].image) {
          const newWH = this.commonService.calculateWH(this.postDetails?.data[index].image as ImageElement)
          w = newWH.w;
          h = newWH.h;
        }
      }
      const croppedCanvas = this.cropper.getCroppedCanvas();
      const resizedCanvas = document.createElement('canvas');
      const resizedContext = resizedCanvas.getContext('2d')!;
      resizedCanvas.width = w;
      resizedCanvas.height = h;
      resizedContext.drawImage(croppedCanvas, 0, 0, w, h);
      const resizedImageData = resizedCanvas.toDataURL('image/png');
      if (selectedItem) {
        const index = parseInt(selectedItem.index, 10); // Parse index to integer
        if (!isNaN(index) && this.postDetails?.data) {
          this.formData.get(this.selectedImage)?.setValue(resizedImageData);
          this.imageCropper.hide();
        }
      }
    }
  }
  getIdByControlName(controlName: string): string | null {
    const item = this.dataset.find((field: any) => field.controlName === controlName);
    return item ? item.id : null;
  }
}
