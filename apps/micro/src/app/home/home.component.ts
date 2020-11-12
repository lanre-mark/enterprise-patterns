import { Component } from '@angular/core';
import { Widget } from '@fem/api-interfaces';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'fem-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent {
  price;
  mode;
  widgets: Widget[];

  reCalculateTotal(mode: string, widgtes: Widget[], widget: Widget) {
    this.widgets = this.updateWidgets(mode, widgtes, widget);    
    this.price = this.getTotalPrice(this.widgets);
  }
  updateWidgets(mode: string, widgtes: Widget[], widget: Widget) {
    switch (mode) {
      case 'create':
        return this.addWidget(widgtes, widget)
      case 'update':
        return this.updateWidget(widgtes, widget)
      case 'delete':
        return this.deleteWidget(widgtes, widget);
      default:
        break;
    }
  }
  updateWidget(widgets, widget) {
    return widgets.map((wdgt) =>
      widget.id === wdgt.id ? Object.assign({}, widget) : wdgt
    );
  }

  deleteWidget(widgets, widget) {
    return widgets.filter((wdgt) => widget.id !== wdgt.id);
  }

  addWidget(widgets, widget) {
    const newWidget = Object.assign({}, widget, { id: uuidv4() });
    return [...widgets, newWidget];
  }

  getTotalPrice(widgets) {
    return widgets.reduce((acc, curr) => acc + curr.price, 0);
  }
}
