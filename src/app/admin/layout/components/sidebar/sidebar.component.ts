import { Component, AfterViewInit, OnInit } from '@angular/core';
import { PanelService } from '../panel.service';
import { Menu, MenuModel } from '../menu-model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements AfterViewInit , OnInit {

  constructor(private _service : PanelService) { }
  allMenus: MenuModel[] = [];
  getMenus() {
    this._service.getMenus(0, 50).subscribe(menus => {
      this.allMenus = this.buildMenuHierarchy(menus.items);
    });
  }

  buildMenuHierarchy(menus: MenuModel[]): MenuModel[] {
    const menuMap = new Map<string, MenuModel>();

    menus.forEach(menu => {
      menuMap.set(menu.id, menu);
    });

    menus.forEach(menu => {
      if (menu.parentMenuId) {
        let parentMenu = menuMap.get(menu.parentMenuId);
        parentMenu!.subMenus = [];
        if (parentMenu) {
          parentMenu.subMenus.push(menu);
        }
      }
    });

    return menus.filter(menu => !menu.parentMenuId);
  }
  ngOnInit(): void {
    this.getMenus();
  }
  ngAfterViewInit() {
    const allDropdown = document.querySelectorAll('#sidebar .side-dropdown');
    const sidebar = document.getElementById('sidebar');
    const toggleSidebar = document.querySelector('nav .toggle-sidebar');
    const allSideDivider = document.querySelectorAll('#sidebar .divider');

    if (!sidebar || !toggleSidebar) {
      return; // Eğer sidebar veya toggleSidebar bulunamazsa, işlemi sonlandır.
    }

    allDropdown.forEach(item => {
      const a = item.parentElement?.querySelector('a:first-child');
      if (!a) return;

      a.addEventListener('click', (e) => {
        e.preventDefault();

        if (!a.classList.contains('active')) {
          allDropdown.forEach(i => {
            const aLink = i.parentElement?.querySelector('a:first-child');
            aLink?.classList.remove('active');
            i.classList.remove('show');
          });
        }

        a.classList.toggle('active');
        item.classList.toggle('show');
      });
    });

    if (sidebar.classList.contains('hide')) {
      allSideDivider.forEach(item => {
        item.textContent = '-';
      });
      allDropdown.forEach(item => {
        const a = item.parentElement?.querySelector('a:first-child');
        a?.classList.remove('active');
        item.classList.remove('show');
      });
    } else {
      allSideDivider.forEach(item => {
        item.textContent = item.getAttribute('data-text');
      });
    }

    toggleSidebar.addEventListener('click', () => {
      sidebar.classList.toggle('hide');

      if (sidebar.classList.contains('hide')) {
        allSideDivider.forEach(item => {
          item.textContent = '-';
        });

        allDropdown.forEach(item => {
          const a = item.parentElement?.querySelector('a:first-child');
          a?.classList.remove('active');
          item.classList.remove('show');
        });
      } else {
        allSideDivider.forEach(item => {
          item.textContent = item.getAttribute('data-text');
        });
      }
    });

    sidebar.addEventListener('mouseleave', () => {
      if (sidebar.classList.contains('hide')) {
        allDropdown.forEach(item => {
          const a = item.parentElement?.querySelector('a:first-child');
          a?.classList.remove('active');
          item.classList.remove('show');
        });
        allSideDivider.forEach(item => {
          item.textContent = '-';
        });
      }
    });

    sidebar.addEventListener('mouseenter', () => {
      if (sidebar.classList.contains('hide')) {
        allDropdown.forEach(item => {
          const a = item.parentElement?.querySelector('a:first-child');
          a?.classList.remove('active');
          item.classList.remove('show');
        });
        allSideDivider.forEach(item => {
          item.textContent = item.getAttribute('data-text');
        });
      }
    });
  }
}
