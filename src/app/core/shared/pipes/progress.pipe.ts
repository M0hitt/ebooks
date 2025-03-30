import { Pipe, PipeTransform } from '@angular/core';
import { IBookProgress } from '../../interfaces';

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
    if (!lastReadPosition || !userId || totalChapters <= 0) {
      return 0;
    }
    const userProgress = lastReadPosition[userId]?.ChapterIndex;

    if (userProgress === undefined) {
      return 0;
    }
       const progress = ((userProgress + 1) * 100)/ totalChapters;
      debugger;
       return progress;
  }

}
