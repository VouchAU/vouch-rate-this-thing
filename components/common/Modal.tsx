import React, { PropsWithChildren } from 'react';
import { Button } from './Button';

export type ModalProps = PropsWithChildren<{
  open: boolean;
  title?: string;
  onClose: () => void;
  onSave?: () => any | Promise<any>;
  SaveButton?: React.ReactNode;
}>;

const Modal = ({ children, open, title, onClose, onSave, SaveButton }: ModalProps) => {
  function handleClose() {
    if (onClose) {
      onClose();
    }
  }

  async function handleSave() {
    if (onSave) {
      try {
        await onSave();
      } catch (_) {}
    }
  }

  return (
    <>
      {open ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-full">
            <div className="relative my-6 mx-auto w-full max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  {title ? <h3 className="text-xl font-semibold">{title}</h3> : null}
                </div>
                <div className="py-5 px-8">{children}</div>
                <div className="flex items-center justify-between p-6 border-t border-solid border-slate-200 rounded-b">
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  {SaveButton ? (
                    SaveButton
                  ) : onSave ? (
                    <Button variant="primary" onClick={handleSave}>
                      Save Changes
                    </Button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export { Modal };
