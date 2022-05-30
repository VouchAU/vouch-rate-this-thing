import React, { FormEvent, useEffect, useState } from 'react';
import { Input } from './common/Input';
import { Modal, ModalProps } from './common/Modal';

type ConfigureRequestFormProps = {
  onSubmit: (data: any) => any | Promise<any>
}

const ConfigureRequestForm = ({ onSubmit }: ConfigureRequestFormProps) => {
  const [questions, setQuestions] = useState<string[]>(['']);
  function handleSubmit() {
    console.log('Hello World');
  }

  function addQuestion() {
    setQuestions([...questions, ''])
  }

  function removeQuestion(idx: number) {
    const arr = [ ...questions ];
    arr.splice(idx, 1);
    setQuestions(arr);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-12 sm:-mx-2 space-y-3">
      <Input id="nameInput" label="Campaign Name" type="text" autoFocus />
      {
        questions.map((_, idx) => {
          return (
            <div className="flex justify-between">
              <Input id={`question-${idx}`} label="Question text" type="text" />
              <button
                onClick={() => removeQuestion(idx)}
                type="button"
                className="pl-5 text-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              </button>
            </div>
          )
        })
      }
      <div>
        <button
          type="button"
          className="text-blue-600 dark:text-blue-400 hover:underline"
          onClick={addQuestion}
        >
          Add question
        </button>
      </div>
    </form>
  )
};

export { ConfigureRequestForm };
