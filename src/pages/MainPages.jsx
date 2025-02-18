import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../store/user/user.reducer";
import { Table, Space, Button } from "antd";

export default function MainPages() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    // Only fetch data if userData is null or empty
    if (!userData || userData.length === 0) {
      const fetchData = async () => {
        try {
          const { data } = await axios.get(
            "https://jsonplaceholder.typicode.com/users"
          );

          // Format the data
          const formattedData = data.map((user) => ({
            ...user,
            address: `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`,
            company: `${user.company.name}`,
          }));

          // Dispatch to Redux to update the state
          dispatch(setCurrentUser(formattedData));
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [dispatch, userData]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a href={`edit-user/${record.id}`}>Edit {record.name}</a>
          <Button
            onClick={() => {
              dispatch(
                setCurrentUser(
                  userData.filter((item) => item.name !== record.name)
                )
              );
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <h1 className="text-center pt-5">User Management Main Pages</h1>
      <div className="px-5 py-3">
        <Table dataSource={userData || []} columns={columns} rowKey="id" />
        <a href="/add-user"><Button type="primary">Add User</Button></a>
      </div>
    </>
  );
}
