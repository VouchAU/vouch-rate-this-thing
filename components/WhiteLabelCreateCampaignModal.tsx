import cuid from 'cuid';
import { useState } from 'react';
import { Button } from './common/Button';
import { Input } from './common/Input';
import { Modal } from './common/Modal';
import { Select } from './common/Select';

type Props = {
  open: boolean;
  onClose: () => void;
};

type Question = {
  id: string;
  maxduration: number;
  optional: boolean;
  text: string;
  type: 'screen' | 'video';
};

const WhiteLabelCreateCampaignModal = (props: Props) => {
  const { open, onClose } = props;

  const [campaignName, setCampaignName] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);

  function updateQuestion(id: string, question: Question) {
    setQuestions((prev) =>
      prev.map((prevQuestion) => {
        if (prevQuestion.id !== id) {
          return prevQuestion;
        }
        return question;
      })
    );
  }

  function addQuestion() {
    setQuestions((prev) => [
      ...prev,
      {
        id: cuid(),
        maxduration: 60,
        optional: false,
        text: '',
        type: 'video',
      },
    ]);
  }

  function removeQuestion(id: string) {
    setQuestions((prev) => prev.filter((question) => question.id !== id));
  }

  function handleSubmit() {
    const data = {
      campaignName,
      questions,
    };
    window.alert(JSON.stringify(data));
  }

  return (
    <form onSubmit={handleSubmit}>
      <Modal
        open={open}
        title="Create Campaign"
        onClose={onClose}
        SaveButton={
          <Button variant="primary" type="submit">
            Save Campaign
          </Button>
        }
      >
        <div className="sm:-mx-2 space-y-3">
          <Input
            autoFocus
            required
            id="nameInput"
            label="Campaign Name"
            type="text"
            onChange={(event) => {
              setCampaignName(event.currentTarget.value);
            }}
          />

          {questions.map((question, idx) => {
            return (
              <div className="flex justify-between" key={question.id}>
                <div className="flex gap-x-2">
                  <Input
                    autoFocus
                    required
                    id={`question-${question.id}-text`}
                    label={`Question ${idx + 1}`}
                    type="text"
                    defaultValue={question.text}
                    onBlur={(event) => {
                      updateQuestion(question.id, {
                        ...question,
                        text: event.currentTarget.value,
                      });
                    }}
                  />

                  <Input
                    id={`question-${question.id}-maxduration`}
                    label="Max Duration"
                    placeholder="seconds"
                    type="number"
                    defaultValue={question.maxduration}
                    onBlur={(event) => {
                      updateQuestion(question.id, {
                        ...question,
                        maxduration: Number.parseInt(event.currentTarget.value),
                      });
                    }}
                  />

                  <Select
                    id={`question-${question.id}-type`}
                    label="Type"
                    options={[
                      'video',
                      // 'screen'
                    ].map((x) => {
                      return {
                        id: x,
                        label: x.toLocaleUpperCase(),
                        value: x,
                      };
                    })}
                    onBlur={(event) => {
                      if (event.currentTarget.value !== 'screen' && event.currentTarget.value !== 'video') {
                        return;
                      }
                      updateQuestion(question.id, {
                        ...question,
                        type: event.currentTarget.value,
                      });
                    }}
                  ></Select>

                  <Select
                    id={`question-${question.id}-optional`}
                    label="Optional"
                    options={['yes', 'no'].map((x) => {
                      return {
                        id: x,
                        label: x.toLocaleUpperCase(),
                        value: x,
                      };
                    })}
                    onBlur={(event) => {
                      const boolValue = event.currentTarget.value === 'yes';
                      updateQuestion(question.id, {
                        ...question,
                        optional: boolValue,
                      });
                    }}
                  ></Select>
                </div>

                <button
                  onClick={() => removeQuestion(question.id)}
                  type="button"
                  className="text-red-600 hover:bg-red-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  text-center inline-flex items-center p-2"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            );
          })}

          <div>
            <Button variant="ghost" onClick={addQuestion}>
              Add question
            </Button>
          </div>
        </div>
      </Modal>
    </form>
  );
};

export { WhiteLabelCreateCampaignModal };
