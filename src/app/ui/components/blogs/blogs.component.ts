import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/admin/components/post/post.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

  constructor(private postService : PostService) { }
  posts: any[] = [];
  ngOnInit(): void {
    this.getPosts();
  }


  getPosts() {
    this.postService.getPosts(0,10).subscribe((response: any) => {
      this.posts = response.items;
    });
  }

}
