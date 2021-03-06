import { BrowserModule } from '@angular/platform-browser';
import { NgModule,} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatIconModule, MatInputModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SpacelistComponent } from './components/routes/spacelist/spacelist.component';
import { SidenavComponent } from './components/routes/sidenav/sidenav.component';
import { WorkSpaceComponent } from './components/routes/work-space/work-space.component';
import { CreateSpaceComponent } from './components/dialogue/create-space/create-space.component';
import { SpaceInfoComponent } from './components/dialogue/space-info/space-info.component';
import { CreateIdeaComponent } from './components/dialogue/create-idea/create-idea.component';
import { IdeaInfoComponent } from './components/dialogue/idea-info/idea-info.component';
import { IdeaCardComponent } from './components/cards/idea-card/idea-card.component';
import { GroupInfoComponent } from './components/dialogue/group-info/group-info.component';

import { CookieService } from 'ngx-cookie-service';
import { GroupCardComponent } from './components/cards/group-card/group-card.component';

@NgModule({
  declarations: [
    AppComponent,
    SpacelistComponent,
    SidenavComponent,
    WorkSpaceComponent,
    CreateSpaceComponent,
    SpaceInfoComponent,
    CreateIdeaComponent,
    IdeaInfoComponent,
    IdeaCardComponent,
    GroupInfoComponent,
    GroupCardComponent
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
    MatCardModule,
    FormsModule,
    BrowserAnimationsModule,
    DragDropModule
  ],
  entryComponents: [
    CreateIdeaComponent,
    CreateSpaceComponent,
    IdeaInfoComponent,
    GroupInfoComponent,
    SpaceInfoComponent
  ],
  providers: [ CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
