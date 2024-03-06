import { Card, CardBody, CardHeader } from "@nextui-org/react";

export const Reputation = () => {
  return (
    <Card
      radius="lg"
      className="mr-6 min-w-[380px] max-w-[460px] min-h-[250px]"
    >
      <CardHeader className=" ml-10 mt-6 justify-between">
        <h3 className="font-bold">Reputation Point</h3>
      </CardHeader>
      <CardBody className="flex justify-center items-center">
        <p className="text-6xl font-bold text-violet-300 py-5">100</p>
      </CardBody>
    </Card>
  );
};
