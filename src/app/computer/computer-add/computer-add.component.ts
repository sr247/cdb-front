import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ComputerService} from '../../computer.service';
import {Computer} from '../../computer.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-computer-add',
  templateUrl: './computer-add.component.html',
  styleUrls: ['./computer-add.component.scss']
})
export class ComputerAddComponent implements OnInit {

  errorMessage: string;
  addForm: FormGroup;

  constructor(private computerService: ComputerService, private fb: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.createForm();
  }

  cancel() {
    this.router.navigate(['/computer']).catch().then();
  }

  addComputer(): void {
    if (this.addForm.status.toLowerCase() === 'valid') {
      console.log('addComputer');
      const computer = new Computer();
      computer.name = this.addForm.controls.name.value;
      computer.introduced = this.addForm.controls.introduced.value;
      computer.discontinued = this.addForm.controls.discontinued.value;
      computer.companyId = this.addForm.controls.companyId.value;

      console.log('computer: ', computer);

      this.computerService.addComputer(computer).subscribe(
        () => this.router.navigate(['/computer']).catch().then(),
        () => this.errorMessage = 'There were errors while adding the computer. Please try again.'
      );
    }
  }

  createForm() {
    this.addForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      introduced: '',
      discontinued: '',
      companyId: ''
    });
  }

}
