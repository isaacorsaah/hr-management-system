import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MatCardModule 
  ],
  providers: [AuthService, AuthGuard],
  exports: [LoginComponent],
})
export class AuthModule {}