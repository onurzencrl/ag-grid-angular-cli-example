import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/admin/components/post/post.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {

  blogId!: any;
  blogDetail: any;

  constructor(private route: ActivatedRoute, private blogService: PostService) {}

  ngOnInit(): void {
    // URL'den blog ID'sini al
    this.blogId = this.route.snapshot.paramMap.get('id');

    // Servis aracılığıyla blog detayını getir
    this.blogService.getBlogDetail(this.blogId).subscribe((data) => {
      this.blogDetail = data;
    });
  }

}
