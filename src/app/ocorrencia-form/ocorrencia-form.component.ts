import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ocorrencia-form',
  templateUrl: './ocorrencia-form.component.html',
  styleUrls: ['./ocorrencia-form.component.css']
})
export class OcorrenciaFormComponent implements OnInit {

  @Output() submitEvent = new EventEmitter<{ descricao: string, data: string, numeroOcorrencia: string }>();
  group: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.group = this.fb.group({
      descricao: ['testando', Validators.required],
      data: [null, Validators.required],
      numeroOcorrencia: [null]
    });
  }

  submit(): void {
    if (this.group.valid) {
      this.submitEvent.emit(this.group.value);
      this.group.reset();
    }
  }
}
