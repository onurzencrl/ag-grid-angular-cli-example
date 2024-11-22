import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnurTableService {

  constructor() { }

  private cellValueChangedSource = new Subject<any>();
  cellValueChanged$ = this.cellValueChangedSource.asObservable();

  cellValueChanged(data: any) {
    this.cellValueChangedSource.next(data);
  }
  private selectedDataSubject = new BehaviorSubject<any[]>([]);
  selectedData$ = this.selectedDataSubject.asObservable();

  setSelectedData(data: any[]): void {
    this.selectedDataSubject.next(data);
  }

  getSelectedData(): Observable<any[]> {
    return this.selectedData$;
  }
}
