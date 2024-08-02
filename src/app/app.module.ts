import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ExploreComponent } from './components/explore/explore.component';
import { UserComponent } from './components/user/user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  { path: '', component: ExploreComponent },
  { path: 'user/:username', component: UserComponent },
];

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [],
})
export class AppModule {}
