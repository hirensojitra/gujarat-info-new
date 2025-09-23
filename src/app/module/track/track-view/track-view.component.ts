import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { TrackService } from 'src/app/common/services/track.service';
import { UserPublicInfo } from 'src/app/graphql/types/login.types';
import { RoleService } from 'src/app/common/services/role.service';
import { Role } from 'src/app/graphql/types/role.types';

@Component({
  selector: 'app-track-view',
  templateUrl: './track-view.component.html',
  styleUrls: ['./track-view.component.scss']
})
export class TrackViewComponent implements OnInit {
  imgParam: string | null = null;
  trackedData: any[] = [];
  tableHeaders: string[] = [];
  user: UserPublicInfo | null = null;
  roles: Role[] = [];
  userRole: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private trackService: TrackService,
    private authService: AuthenticationService,
    private roleService: RoleService
  ) { }

  ngOnInit(): void {
    this.imgParam = this.route.snapshot.paramMap.get('imgParam');
    this.user = this.authService.getUser();

    this.roleService.getRoles().subscribe(roles => {
      this.roles = roles;
      if (this.user) {
        const role = this.roles.find(r => r.id === this.user?.role_id);
        this.userRole = role ? role.code : null;
      }
    });

    if (this.imgParam) {
      this.trackService.getTrackData(this.imgParam).subscribe(data => {
        this.trackedData = data.map(d => {
          const valueData = typeof d.value_data === 'string' ? JSON.parse(d.value_data) : d.value_data;
          return {
            ...valueData,
            timestamp: d.timestamp
          }
        });
        if (this.trackedData.length > 0) {
          this.tableHeaders = Object.keys(this.trackedData[0]);
        }
      });
    }
  }

  canExport(): boolean {
    return this.userRole === 'OWNER' || this.userRole === 'ADMINISTRATOR';
  }

  exportExcel(): void {
    if (this.imgParam) {
      this.trackService.generateExcel(this.imgParam).subscribe(blob => {
        this.trackService.downloadFile(blob, `${this.imgParam}.xlsx`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      });
    }
  }

  exportPdf(): void {
    if (this.imgParam) {
      this.trackService.generatePdf(this.imgParam).subscribe(blob => {
        this.trackService.downloadFile(blob, `${this.imgParam}.pdf`, 'application/pdf');
      });
    }
  }
}