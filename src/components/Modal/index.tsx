"use client"

import { useClose, useOpen } from '@/store/useModalStore';
import { cx, css } from '@emotion/css';
import styled from '@emotion/styled';
import { ReactNode } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

const ModalContainer = styled.div`
  background-color: rgba(34, 34, 34, 0.3);
`;

const ContentContainer = styled.div`
  max-height: 90vh;
`;

const modalWidth = {
    md: '450px',
    lg: '530px',
    xl: '630px',
};

interface ModalProps {
    heading?: JSX.Element;
    className?: string;
    overflow?: boolean;
    width?: keyof typeof modalWidth;
    containerPaddingClass?: string;
    children: ReactNode;
}

const Modal = ({
    children,
    heading,
    className,
    width,
    overflow,
    containerPaddingClass = 'py-6 px-6',
}: ModalProps) => {
    const handleClose = useClose();
    return (
        <ModalContainer className="fixed z-50 top-0 left-0 w-screen h-screen ">
            <div className="flex items-center w-full h-full justify-center ">
                <OutsideClickHandler onOutsideClick={handleClose}>
                    <ContentContainer
                        className={cx(
                            'rounded-md modal_content_container bg-white shadow-md',
                            { 'overflow-y-auto': !overflow },
                            width &&
                            css(`
              width: ${modalWidth[width]}
            `)
                        )}
                    >
                        {heading && (
                            <div className="border-b border-gray-light pt-6 pb-4 px-6">
                                {heading}
                            </div>
                        )}
                        <div
                            className={cx(
                                'overflow-auto modal_content',
                                className,
                                containerPaddingClass
                            )}
                        >
                            {children}
                        </div>
                    </ContentContainer>
                </OutsideClickHandler>
            </div>
        </ModalContainer>
    );
};

export default Modal;
