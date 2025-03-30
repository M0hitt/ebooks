import { Pipe, PipeTransform } from '@angular/core';
import { IBookProgress } from '../../../interfaces';

@Pipe({
  name: 'appProgress',
  pure: true,
  standalone:true
})
export class ProgressPipe implements PipeTransform {

  transform(
    lastReadPosition: Record<string, IBookProgress>,
    userId: string,  
    totalChapters: number
  ): number {
    debugger;
    if (!lastReadPosition || !userId || totalChapters <= 0) {
      return 0;
    }

    const userProgress = lastReadPosition[userId]?.ChapterIndex;

    if (userProgress === undefined) {
      return 0;
    }
       const progress = (userProgress / totalChapters) * 100;

       return Math.min(100, Math.max(0, Math.round(progress)));
  }

}
