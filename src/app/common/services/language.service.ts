// src/app/language.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Translations {
  [key: string]: string;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly storageKey = 'activeLanguage';
  private defaultLanguage = 'mr';
  private translations: BehaviorSubject<Translations> = new BehaviorSubject<Translations>({});
  private _languageSubject: BehaviorSubject<string>;
  public language$: Observable<string>;

  constructor(private http: HttpClient) {
    const storedValue = localStorage.getItem(this.storageKey);
    const initialLanguage = storedValue !== null ? storedValue : this.defaultLanguage;
    this._languageSubject = new BehaviorSubject<string>(initialLanguage);
    this.language$ = this._languageSubject.asObservable();
    this.loadTranslations(initialLanguage);
  }

  private loadTranslations(lang: string): void {
    this.http.get<Translations>(`./assets/data/lang/${lang}.json`).subscribe(
      translations => this.translations.next(translations),
      error => console.error(`Could not load translations for ${lang}:`, error)
    );
  }

  public get currentLanguage(): string {
    return this._languageSubject.value;
  }

  public set currentLanguage(language: string) {
    localStorage.setItem(this.storageKey, language);
    this.loadTranslations(language);
    this._languageSubject.next(language);
  }

  public changeLanguage(language: string) {
    this.currentLanguage = language;
  }

  public getTranslation(key: string): Observable<string> {
    return this.translations.asObservable().pipe(
      map(translations => translations[key] || key)
    );
  }

  public getTranslationSync(key: string): string {
    const translations = this.translations.getValue();
    return translations[key] || key;
  }
  
}
