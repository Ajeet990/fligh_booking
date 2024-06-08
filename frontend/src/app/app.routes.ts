import { Routes } from '@angular/router';
import { SearchComponent } from './components/website/search/search.component';
import { BookFlightComponent } from './components/website/book-flight/book-flight.component';
import { MyBookingComponent } from './components/website/my-booking/my-booking.component';
import { LayoutComponent } from './components/admin/layout/layout.component';
import { AirportComponent } from './components/admin/airport/airport.component';
import { CityComponent } from './components/admin/city/city.component';
import { BookingComponent } from './components/admin/booking/booking.component';
import { NewFlightComponent } from './components/admin/new-flight/new-flight.component';
import { LoginComponent } from './components/admin/login/login.component';
import { RegisterComponent } from './components/admin/register/register.component';
import { AllVendorsComponent } from './components/superadmin/all-vendors/all-vendors.component';
import { NewVendorsComponent } from './components/superadmin/new-vendors/new-vendors.component';
import { ProfileComponent } from './components/admin/profile/profile.component';
import { MyFlightComponent } from './components/admin/my-flight/my-flight.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },
    {
        path:'search',
        component:SearchComponent,
        title:'Search Flight'
    },
    {
        path:'book-flight',
        component:BookFlightComponent,
        title:'Book flight'
    },
    {
        path:'my-booking',
        component:MyBookingComponent,
        title:'My bookings'
    },
    {
        path:'login',
        component:LoginComponent,
        title:'Login'
    },
    {
        path:'register',
        component:RegisterComponent,
        title:'Register'
    },
    {
        path:'admin',
        children:[
            {
                path:'profile',
                component:ProfileComponent
            },
            {
                path:'my_flight',
                component:MyFlightComponent
            },
            // {
            //     path:'airport',
            //     component:AirportComponent
            // },
            // {
            //     path:'city',
            //     component:CityComponent
            // },
            // {
            //     path:'all-booking',
            //     component:BookingComponent
            // },
            // {
            //     path:'new-flight',
            //     component:NewFlightComponent
            // },
        ]
    },
    {
        path:'superadmin',
        children:[
            {
                path:'all_vendors',
                component:AllVendorsComponent,
                title:'All vendors'
            },
            {
                path:'new_vendors',
                component:NewVendorsComponent,
                title:'New vendors'
            },
        ]
    }

];
