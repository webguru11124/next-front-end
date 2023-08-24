import { OptionValue } from "@/components/SelectBox";

export const Genders = [{ value: "male", label: "male" }, { value: "female", label: "female" }];
export const Countries = [
  { value: 1, label: "England" },
  { value: 2, label: "US" },
  { value: 3, label: "India" },
  { value: 4, label: "Pakistan" },
  { value: 5, label: "Sweden" },
  { value: 6, label: "France" },
];
export const Languages = [
  { value: 1, label: "England" },
  { value: 2, label: "US" },
  { value: 3, label: "India" },
  { value: 4, label: "Pakistan" },
  { value: 5, label: "Sweden" },
  { value: 6, label: "France" },
];
export const Timezones = [{ value: "CET", label: "CET" }, { value: "UDT", label: "UDT" }, { value: "ECT", label: "ECT" }];
export const Province = [
  { value: "North", label: "North" }, { value: "West", label: "West" }, { value: "South", label: "South" }, { value: "East", label: "East" }];
export const OrgTypes = [{ value: 0, label: "Trading" }, { value: 1, label: "Forwarder/Customer" }];
export const Roles = [{ value: 0, label: "Admin" }, { value: 1, label: "Manager" }, { value: 2, label: "Employee" }, { value: 3, label: "Bot" }];
export const Currencies = [{ value: 1, label: "USDT" }, { value: 2, label: "EURO" }];
export const Tables = [
  { value: "Vendor", label: "Vendor" },
  { value: "Customer", label: "Customer" },
  { value: "Forwarder", label: "Forwarder" },
  { value: "Bol", label: "Bol" },
  { value: "So", label: "So" },
  { value: "Po", label: "Po" },
  { value: "Booking", label: "Booking" },
  { value: "Shippiments", label: "Shippiments" },
  { value: "Invoice", label: "Invoice" },
  { value: "Pl", label: "Pl" },
  { value: "Item", label: "Item" },
];
export const findValue = (values: Array<OptionValue>, data: string | number | undefined | null): OptionValue | undefined => {
  return values.find((v: OptionValue) => v.label === data || v.value === data);
}