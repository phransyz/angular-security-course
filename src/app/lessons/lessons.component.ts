import {AfterViewInit, Component, OnInit} from '@angular/core';
import {LessonsService} from "../services/lessons.service";
import {Observable} from "rxjs/Observable";
import {Lesson} from "../model/lesson";

@Component({
    selector: 'lessons',
    templateUrl: './lessons.component.html',
    styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit, AfterViewInit {

    lessons$: Observable<Lesson[]>;

    constructor(private lessonsService: LessonsService) {

    }


    ngOnInit() {
        this.lessons$ = this.lessonsService.loadAllLessons()
            .catch(err => Observable.of([]));
    }


    ngAfterViewInit() {

        this.lessons$.subscribe( lessons => {

            const container = document.getElementById('lessons');

            lessons.forEach(lesson => {

                // simulating pre-MVC code
                const lessonDiv = document.createElement("div");

                lessonDiv.className = "lesson-detail card card-strong";

                lessonDiv.innerHTML = "<h3>" + lesson.description + "</h3>";

                container.appendChild(lessonDiv);

                // typically done by many ajax frameworks that are based on server-side rendering
                const scripts = lessonDiv.getElementsByTagName('script');

                for (let n = 0; n < scripts.length; n++) {
                    eval(scripts[n].innerHTML);
                }


            });

        });

    }


}
