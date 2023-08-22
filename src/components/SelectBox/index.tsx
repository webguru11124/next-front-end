"use client";

import styled from "@emotion/styled";
import React, { SelectHTMLAttributes, useState } from "react";
import { BsChevronDown } from "react-icons/bs";

import Error from "@/components/Error";

import { Combobox } from "@headlessui/react";
import {
  Control,
  FieldError,
  UseFormRegister,
  useController,
} from "react-hook-form";
import { BsCheck2 } from "react-icons/bs";

interface SelectBoxProps extends SelectHTMLAttributes<HTMLSelectElement> {
  control: Control<any, unknown>;
  options: Array<string>;
  placeholder: string;
  label?: string;
  name: string;
  error?: FieldError | undefined | any;
}

const OptionsContainer = styled.div`
  transform: translateY(100%);
  bottom: 10px;
  box-sizing: content-box;
  left: -1px;
  overflow: auto;
`;

const SelectBox: React.FC<SelectBoxProps> = ({
  placeholder,
  label,
  control,
  options,
  name,
  error,
}) => {
  const [query, setQuery] = useState("");

  const {
    field: { onChange, value },
  } = useController({
    control,
    name: name,
  });

  const filteredValue =
    query === ""
      ? options
      : options.filter((options) => {
          return options
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""));
        });
  const handleChange = (data: any) => {
    onChange(data);
  };
  return (
    <div>
      <Combobox
        onChange={handleChange}
        value={value ?? ""}
        name={name}
        as="div"
      >
        {label && (
          <Combobox.Label>
            <label>{label}</label>
          </Combobox.Label>
        )}
        <div className="relative w-full mt-2 text-lg ">
          <div className="relative  mt-2">
            <Combobox.Input
              className="w-full  py-2 px-[1em] pr-10 border  border-gray-border   outline-none rounded-md "
              onChange={(event) => setQuery(event.target.value)}
              placeholder={placeholder}
              displayValue={(value: string): string => value}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <BsChevronDown className="h-5 w-5 " />
            </Combobox.Button>
          </div>
          <Combobox.Options
            className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 
            shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10 "
          >
            {filteredValue.map((value, index) => (
              <Combobox.Option
                key={index}
                value={value}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4  text-lg
                                    ${
                                      active
                                        ? "bg-teal-600 text-black"
                                        : "text-gray-900"
                                    }`
                }
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {value}
                    </span>
                    {selected ? (
                      <span
                        className={`absolute inset-y-0 left-0 flex items-center pl-3 
                                                ${
                                                  active
                                                    ? "text-black"
                                                    : "text-teal-600"
                                                }`}
                      >
                        <BsCheck2 className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </div>
        {error && error.message && (
          <div className="mt-2">
            <Error message={error.message} />
          </div>
        )}
      </Combobox>
    </div>
  );
};
export default SelectBox;
