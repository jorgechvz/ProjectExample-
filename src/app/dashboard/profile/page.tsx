import { auth } from "@/auth";
import EditEmailForm from "@/components/ui/profile/EditEmailForm";
import EditInfoForm from "@/components/ui/profile/EditInfoForm";
import EditPasswordForm from "@/components/ui/profile/EditPasswordForm";
import { fecthInfoUserbyId } from "@/lib/data";
import { Divider } from "@nextui-org/react";

export default async function ProfilePage() {
  const session = await auth();
  const userId: string = session?.user?.id as string;
  const getInfoUser = await fecthInfoUserbyId(userId);

  const info = {
    id: getInfoUser?.id || "",
    name: getInfoUser?.name || "",
  };
  const infoEmail = {
    id: getInfoUser?.id || "",
    email: getInfoUser?.email || "",
  };
  const infoPassword = {
    id: getInfoUser?.id || "",
    password: getInfoUser?.password || "",
    newPassword: "",
  };

  return (
    <div className="flex flex-col flex-1 mx-7 my-10 gap-y-5">
      <h1 className="text-blue-charcoal-950 text-3xl my-5 font-bold">
        My Account
      </h1>
      <div>
        <h3>Personal Information</h3>
        <Divider className="my-3 h-1 bg-blue-charcoal-950" />
        <div className="mt-5 lg:flex block">
          <div className="flex-[1.5]">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit quisquam rerum.
            </p>
          </div>
          <EditInfoForm userData={info} />
        </div>
      </div>
      <div>
        <h3>E-mail address</h3>
        <Divider className="my-3 h-1 bg-blue-charcoal-950" />
        <div className="mt-5 lg:flex block">
          <div className="flex-[1.5]">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit quisquam rerum.
            </p>
          </div>
          <EditEmailForm userData={infoEmail} />
        </div>
      </div>
      <div>
        <h3>Password</h3>
        <Divider className="my-3 h-1 bg-blue-charcoal-950" />
        <div className="mt-5 lg:flex block">
          <div className="flex-[1.5]">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit quisquam rerum.
            </p>
          </div>
          <EditPasswordForm userData={infoPassword} />
        </div>
      </div>
    </div>
  );
}
