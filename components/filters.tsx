"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Dropdown from "./dropdown";
import Form from "./form";
import InputField from "./input-field";
import setParams from "../lib/set-params";

export default function Filters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  async function handleFilters(formData: FormData) {
    const params = new URLSearchParams(searchParams);
    const newParams = setParams(params, formData, ["source", "saved"]);
    replace(`${pathname}?${newParams.toString()}`);
  }

  return (
    <Dropdown label="filters">
      <Form pending={false} action={handleFilters}>
        <InputField
          type="text"
          id="source"
          autoComplete=""
          small
          defaultValue={searchParams.get("source") ?? ""}
        />
        <div className="flex gap-2">
          <input
            type="checkbox"
            name="saved"
            id="saved"
            value="true"
            defaultChecked={searchParams.get("saved") === "true" ? true : false}
          />
          <label htmlFor="saved">saved</label>
        </div>
      </Form>
    </Dropdown>
  );
}
