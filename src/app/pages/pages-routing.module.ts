import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateNotificationComponent } from './create-notification/create-notification.component';
import { ViewNotificationsComponent } from './view-notifications/view-notifications.component';

// import { ViewDevicesComponent } from './view-devices/view-devices.component';
// import { ViewNotificationsComponent } from './view-notifications/view-notifications.component';


const routes: Routes = [
    {
        path: '',
        data: { title: 'Notification' },
        children: [
            {
                path: '',
                redirectTo: 'create-notification'
            },
            {
                path: 'create-notification',
                component: CreateNotificationComponent,
                data: {
                    title: 'Create Notification'
                }
            },
            {
                path: 'view-notifications',
                component: ViewNotificationsComponent,
                data: {
                    title: 'View Notifications'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
