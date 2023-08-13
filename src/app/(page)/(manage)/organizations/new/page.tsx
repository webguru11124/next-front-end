
import Card from "@/components/Card";
import Input from "@/components/Input";
import SelectBox from "@/components/SelectBox";


const COMPLETION_STATUSES = [
    {
        value: 'male',
        label: 'male',
    },
    {
        value: 'female',
        label: 'female',
    },
];
export default function CreateOrganization() {
    return (<div className="flex flex-col">
        < div className="flex flex-col gap-y-5">
            <Card size="lg">
                <div className="mb-5">
                    <h2 className="text-blue-main  font-bold text-2xl text-center">Organization Details</h2>
                </div>
                <div className="grid grid-cols-2 gap-x-14  gap-y-6 px-6  ">
                    <div className="col-start-1">
                        <Input label="Organization Name" name="name" placeholder="Enter Name here" />
                    </div>
                    <SelectBox
                        label="Gender"
                        options={COMPLETION_STATUSES}
                        placeholder={`${('Select your gender')}`}
                    />
                    <div className="col-start-1">
                        <SelectBox
                            label="Country"
                            options={COMPLETION_STATUSES}
                            placeholder={`${('Select a country')}`}
                        />
                    </div>
                    <SelectBox
                        label="Language"
                        options={COMPLETION_STATUSES}
                        placeholder={`${('Select a language')}`}
                    />
                    <div className="col-span-2">
                        <SelectBox
                            label="Time Zone"

                            options={COMPLETION_STATUSES}
                            placeholder={`${('Select your timezone')}`}
                        />
                    </div>
                </div>
            </Card>
            <Card size="lg">
                <div className="mb-5">
                    <h2 className="text-blue-main  font-bold text-2xl text-center">Invite User</h2>
                </div>
                <div className="grid grid-cols-2 gap-x-14  gap-y-6 px-6  ">
                    <div className="col-start-1">
                        <Input label="Organization Name" name="name" placeholder="Enter Name here" />
                    </div>
                    <SelectBox
                        label="Gender"
                        options={COMPLETION_STATUSES}
                        placeholder={`${('Select your gender')}`}
                    />
                    <div className="col-start-1">
                        <SelectBox
                            label="Country"
                            options={COMPLETION_STATUSES}
                            placeholder={`${('Select a country')}`}
                        />
                    </div>
                    <SelectBox
                        label="Language"
                        options={COMPLETION_STATUSES}
                        placeholder={`${('Select a language')}`}
                    />
                    <div className="col-span-2">
                        <SelectBox
                            label="Time Zone"

                            options={COMPLETION_STATUSES}
                            placeholder={`${('Select your timezone')}`}
                        />
                    </div>
                </div>
            </Card>
            <Card size="lg">
                <div className="mb-5">
                    <h2 className="text-blue-main  font-bold text-2xl text-center">Regional Settings </h2>
                </div>
                <div className="grid grid-cols-2 gap-x-14  gap-y-6 px-6  ">
                    <div className="col-start-1">
                        <Input label="Organization Name" name="name" placeholder="Enter Name here" />
                    </div>
                    <SelectBox
                        label="Gender"
                        options={COMPLETION_STATUSES}
                        placeholder={`${('Select your gender')}`}
                    />
                    <div className="col-start-1">
                        <SelectBox
                            label="Country"
                            options={COMPLETION_STATUSES}
                            placeholder={`${('Select a country')}`}
                        />
                    </div>
                    <SelectBox
                        label="Language"
                        options={COMPLETION_STATUSES}
                        placeholder={`${('Select a language')}`}
                    />
                    <div className="col-span-2">
                        <SelectBox
                            label="Time Zone"

                            options={COMPLETION_STATUSES}
                            placeholder={`${('Select your timezone')}`}
                        />
                    </div>
                </div>
            </Card>
        </div>
        <div className='mt-9 w-full flex justify-end'>
            <button className="rounded-md text-[18px] bg-blue-primary py-2.5 px-10 text-white font-bold " >Get Started</button>
        </div>
    </div>
    );
}