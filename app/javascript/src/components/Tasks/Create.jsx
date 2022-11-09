import React, { useEffect, useState } from "react";

import tasksApi from "apis/tasks";
import usersApi from "apis/users";
import Container from "components/Container";

import Form from "./Form";

import PageLoader from "../PageLoader";

const Create = ({ history }) => {
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      await tasksApi.create({ title, assigned_user_id: userId });
      setLoading(false);
      history.push("/");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const {
        data: { users },
      } = await usersApi.list();
      setUsers(users);
      setUserId(users[0].id);
      setPageLoading(false);
    } catch (error) {
      logger.error(error);
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <Form
        assignedUser={users[0]}
        handleSubmit={handleSubmit}
        loading={loading}
        setTitle={setTitle}
        setUserId={setUserId}
        title={title}
        users={users}
      />
    </Container>
  );
};

export default Create;
