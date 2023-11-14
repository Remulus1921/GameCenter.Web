import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { PlatformService } from 'src/app/core/services/platform/platform.service';
import { PlatformDto } from 'src/app/models/platform/platformDto';

@Component({
  selector: 'app-platform-list',
  templateUrl: './platform-list.component.html',
  styleUrls: ['./platform-list.component.scss'],
})
export class PlatformListComponent implements OnInit {
  title = 'Panel Platform';
  platforms!: PlatformDto[];

  displayedColumns: string[] = ['index', 'name', 'edit', 'delete'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _platformService: PlatformService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getPlatformList();
  }

  getPlatformList(): void {
    this._platformService.getPlatforms().subscribe((platforms) => {
      this.platforms = platforms;
      this.dataSource = new MatTableDataSource(platforms);
      this.dataSource.sort = this.sort;
    });
  }

  deletePlatform(platformId: string): void {
    this._platformService
      .deletePlatform(
        this.platforms.find((platform) => platform.id === platformId)!
      )
      .subscribe(
        () => {
          this.toastr.warning('Poprawnie usunięto platformę', 'Stan platformy');
          this.getPlatformList();
        },
        (error) => {
          this.toastr.error(error.error, 'Stan platformy');
        }
      );
  }
}
