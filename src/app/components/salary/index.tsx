import { Card, CardHeader } from "@nextui-org/react";

export const Salary = () => {
  return (
    <Card
      radius="lg"
      className="mx-6 min-w-[380px] max-w-[460px] min-h-[250px]"
    >
      <CardHeader className=" ml-10 mt-10 justify-between">
        <h3 className="font-bold">Ongoing Salary</h3>
      </CardHeader>
    </Card>
  );
};
