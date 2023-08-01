import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { BsChevronDown } from 'react-icons/bs';

import Error from '../Error';

import Option from './Option';

interface OptionItem {
    label: string;
    value: string;
}

interface SelectBoxProps {
    options: Array<OptionItem>;
    placeholder?: string;
    onChange: (val: string) => void;
    value?: string;
    label?: string;
    optionsContainerClassName?: string;
    error?: string;
}

const OptionsContainer = styled.div`
  transform: translateY(100%);
  bottom: 10px;
  box-sizing: content-box;
  left: -1px;
  overflow: auto;
`;

const SelectBox: React.FC<SelectBoxProps> = ({
    options,
    placeholder,
    label,
    onChange,
    value,
    optionsContainerClassName,
    error,
}) => {
    const [shouldDisplayOptions, setShouldDisplayOptions] = useState(false);
    const selectedOption = options.find(
        ({ value: optionValue }) => optionValue === value
    );
    return (
        <OutsideClickHandler onOutsideClick={() => setShouldDisplayOptions(false)}>

            {label && <label>{label}</label>}
            <div className="rounded-md bg-white border relative text-gray-lighter border-gray-border mt-2">
                <div className="absolute z-10 -top-px left-0 overflow-hidden h-full w-full rounded-lg">
                    {Boolean(selectedOption) && (
                        <div className="w-full mb-0.5 h-0.5 bg-focus" />
                    )}
                </div>
                <div className="relative z-20">
                    <button
                        className="flex items-center w-full py-2 pl-3 text-lg text-gray-placeholder"
                        onClick={() => {
                            setShouldDisplayOptions((prev) => !prev);
                        }}
                        type="button"
                    >
                        {selectedOption?.label || placeholder}
                        <BsChevronDown className="ml-auto mr-3" />
                    </button>
                    {shouldDisplayOptions && (
                        <OptionsContainer
                            className={cx(
                                'bg-white border-t-0 z-20 rounded-b-lg pb-2 border border-gray-light absolute bottom-10 w-full',
                                optionsContainerClassName
                            )}
                        >
                            <div className="flex flex-col">
                                {options.map(({ value: optionValue, label }) => (
                                    <Option
                                        key={optionValue}
                                        label={label}
                                        isSelected={value === optionValue}
                                        onSelect={() => {
                                            onChange(optionValue);
                                            setShouldDisplayOptions(false);
                                        }}
                                    />
                                ))}
                            </div>
                        </OptionsContainer>
                    )}
                </div>
            </div>
            {error && (
                <div className="mt-2">
                    <Error message={error} />
                </div>
            )}
        </OutsideClickHandler>
    );
};
export default SelectBox;
