import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'jonathan-tech';
  @ViewChild("hoverDiv") divHover!: ElementRef;
  @ViewChild("serviços") serviços!: ElementRef;
  @ViewChild("sobreNós") sobrenós!: ElementRef;
  @ViewChild("contato") contato!: ElementRef;
  @ViewChild("menuMobile") menuMobile!: ElementRef
  isMobile: boolean = window.innerWidth <= 991
  isOpenMenuMobile: boolean = false
  isApple: boolean = /iPad|iPhone|iPod/.test(navigator.userAgent)

  ngAfterViewInit(){
    this.observerSelector(this.serviços.nativeElement, "in-view-port")
    this.observerSelector(this.sobrenós.nativeElement, "in-view-port")
    this.observerSelector(this.contato.nativeElement, "in-view-port")
    if(this.isMobile){
      this.insertHeightInMenu()
    }
  }

  menu: string[] = ["Serviços", "Sobre Nós", "Contato"]

  hover({ target }: Event): void{
    const {width, height } = (<HTMLElement>target).getBoundingClientRect()
    this.divHover.nativeElement.style.left = `${(<HTMLElement>target)?.offsetLeft}px`
    this.divHover.nativeElement.style.top = `0px`
    this.divHover.nativeElement.style.width = `${width}px`
    this.divHover.nativeElement.style.height = `${height}px`
  }

  observerSelector(sel: HTMLElement, classe: string) {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(classe);
          observer.disconnect()
        } 
      });
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(sel);
  }

  slowMove(data: string): void{
    this.isOpenMenuMobile = false
    this[<"contato" | "sobrenós" | "serviços">data.split(" ").join("").toLowerCase()].nativeElement.scrollIntoView()
  }

  redirectTo(url: string){
    window.open(url, "_blank")
  }

  openCloseMenu(){
    this.isOpenMenuMobile = !this.isOpenMenuMobile
  }

  insertHeightInMenu(): void{
    
      const {offsetHeight, parentElement} = this.menuMobile?.nativeElement
      parentElement.style.setProperty('--height-open', `${offsetHeight}px`)
    
  }
}
