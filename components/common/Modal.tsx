import React, { PropsWithChildren } from "react";

export type ModalProps = PropsWithChildren<{
  open: boolean;
  title?: string;
  onClose?: () => void;
  onSave?: () => any | Promise<any>;
}>;

const Modal = ({ children, open, title, onClose, onSave }: ModalProps) => {

  function handleClose() {
    if (onClose) {
      onClose();
    }
  }

  async function handleSave() {
    if (onSave) {
      try {
        await onSave()
      } catch (_) {}
    }
  }

  return (
    <>
      {open ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-full"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  {
                    title ? (
                      <h3 className="text-xl font-semibold">
                        {title}
                      </h3>
                    ) : null
                  }
                </div>
                <div className="my-5 px-5">
                  {children}
                </div>
                <div className="flex items-center justify-between p-6 border-t border-solid border-slate-200 rounded-b">
                  {
                    onClose ? (
                      <button
                        className="bg-white text-blue-600 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={handleClose}
                      >
                        Close
                      </button>
                    ) : null
                  }
                  {
                    onSave ? (
                      <button
                        className="bg-blue-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={handleSave}
                      >
                        Save Changes
                      </button>
                    ) : null
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export { Modal };