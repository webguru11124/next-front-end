"use client"

import { useClose, useOpen } from '@/store/useModalStore';
import { cx, css } from '@emotion/css';
import styled from '@emotion/styled';
import { ReactNode } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

const PopupContainer = styled.div`
  background-color: rgba(34, 34, 34, 0);
`;

const ContentContainer = styled.div`
  max-height: 90vh;
`;

const PopupWidth = {
    md: '400px',
    lg: '530px',
    xl: '630px',
};

interface PopupProps {
    heading?: JSX.Element;
    className?: string;
    overflow?: boolean;
    width?: keyof typeof PopupWidth;
    containerPaddingClass?: string;
    children: ReactNode;
}

const Popup = ({
    children,
    heading,
    className,
    width,
    overflow,
    containerPaddingClass = 'py-6 px-6',
}: PopupProps) => {
    const open = useOpen();
    const handleClose = useClose();
    return open && (
        <PopupContainer className="fixed z-50 top-0 left-0 w-screen h-screen ">
            <div className="flex items-center w-full h-full justify-end   ">
                <OutsideClickHandler onOutsideClick={handleClose}>
                    <ContentContainer
                        className={cx(
                            'rounded-md Popup_content_container bg-white shadow-md',
                            { 'overflow-y-auto': !overflow },
                            width &&
                            css(`
              width: ${PopupWidth[width]}
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
                                'overflow-auto Popup_content',
                                className,
                                containerPaddingClass
                            )}
                        >
                            {children}
                        </div>
                    </ContentContainer>
                </OutsideClickHandler>
            </div>
        </PopupContainer>
    );
};

export default Popup;
