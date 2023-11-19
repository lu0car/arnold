import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Button } from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["Name", "Job", "Employed", ""];
 
const TABLE_ROWS = [
  {
    name: "John Michael",
    job: "Manager",
    date: "23/04/18",
  },
  {
    name: "Alexa Liras",
    job: "Developer",
    date: "23/04/18",
  },
  {
    name: "Laurent Perrier",
    job: "Executive",
    date: "19/09/17",
  },
  {
    name: "Michael Levi",
    job: "Developer",
    date: "24/12/08",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
  },
];

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex w-max gap-4">
                                <Button color="blue">color blue</Button>
                                <Button color="red">color red</Button>
                                <Button color="green">color green</Button>
                                <Button color="amber">color amber</Button>
                            </div>
                            <div className="flex w-max gap-4 py-5">
                                <div className="flex items-center gap-4">
                                    <Button className="rounded-full">
                                        Filled
                                    </Button>
                                    <Button
                                        variant="gradient"
                                        className="rounded-full"
                                    >
                                        Gradient
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        className="rounded-full"
                                    >
                                        Outlined
                                    </Button>
                                    <Button
                                        variant="text"
                                        className="rounded-full"
                                    >
                                        Text
                                    </Button>
                                </div>
                            </div>
                            <Card className="h-full w-full overflow-scroll">
                                <table className="w-full min-w-max table-auto text-left">
                                    <thead>
                                        <tr>
                                            {TABLE_HEAD.map((head) => (
                                                <th
                                                    key={head}
                                                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                                >
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal leading-none opacity-70"
                                                    >
                                                        {head}
                                                    </Typography>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {TABLE_ROWS.map(
                                            ({ name, job, date }, index) => (
                                                <tr
                                                    key={name}
                                                    className="even:bg-blue-gray-50/50"
                                                >
                                                    <td className="p-4">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {name}
                                                        </Typography>
                                                    </td>
                                                    <td className="p-4">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {job}
                                                        </Typography>
                                                    </td>
                                                    <td className="p-4">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {date}
                                                        </Typography>
                                                    </td>
                                                    <td className="p-4">
                                                        <Typography
                                                            as="a"
                                                            href="#"
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-medium"
                                                        >
                                                            Edit
                                                        </Typography>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
