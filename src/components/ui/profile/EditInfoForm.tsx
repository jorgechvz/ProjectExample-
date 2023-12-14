"use client";

import { UpdateUserPersonalInformation } from "@/lib/actions";
import { UserPersonalInfo } from "@/lib/types";

export default function EditInfoForm({
  userData,
}: {
  userData: UserPersonalInfo;
}) {
  const updateInfoWithId = UpdateUserPersonalInformation.bind(
    null,
    userData.id
  );
  return (
    <form action={updateInfoWithId} className="flex-[3.5]">
      <div>
        <label
          className="mb-3 block text-md font-medium text-blue-charcoal-950"
          htmlFor="name"
        >
          Name
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            className="block w-full rounded-md border border-blue-charcoal-950 py-[9px] pl-4 text-sm outline-2 placeholder:text-blue-charcoal-950"
            defaultValue={userData.name}
          />
        </div>
        <div className="mt-4 flex justify-start gap-4">
          <button
            type="submit"
            className="px-5 py-1 border-1 rounded-md bg-persian-green-950 text-persian-green-50"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
