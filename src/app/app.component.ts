import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public static readonly serverUrl = '/api';
  public commentList: IComment[];
  public userNameField: string;
  public commentField: string;

  constructor(public http: HttpClient) {
  }

  public ngOnInit(): void {
    this.http.get<IComment[]>(AppComponent.serverUrl + '/comments').subscribe(res => this.commentList = res);
  }

  public send(): void {
    const newComment = {userName: this.userNameField, comment: this.commentField} as IComment;
    this.http.post<IComment>(AppComponent.serverUrl + '/save', newComment)
      .subscribe((res: IComment) => this.commentList.push(res));
    this.commentField = '';
    this.userNameField = '';
  }
}

export interface IComment {
  userName: string;
  comment: string;
}
