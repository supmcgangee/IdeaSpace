import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule, MatIconModule, MatInputModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpacelistComponent } from './components/spacelist/spacelist.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { WorkSpaceComponent } from './components/work-space/work-space.component';
import { CreateSpaceComponent } from './components/dialogue/create-space/create-space.component';
import { SpaceInfoComponent } from './components/dialogue/space-info/space-info.component';
import { CreateIdeaComponent } from './components/dialogue/create-idea/create-idea.component';

@NgModule({
  declarations: [
    AppComponent,
    SpacelistComponent,
    SidenavComponent,
    WorkSpaceComponent,
    CreateSpaceComponent,
    SpaceInfoComponent,
    CreateIdeaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  entryComponents: [
    CreateIdeaComponent,
    CreateSpaceComponent,
    SpaceInfoComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
