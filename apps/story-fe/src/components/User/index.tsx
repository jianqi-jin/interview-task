// By Jianqi Jin

import { UserStatus } from "@/interface";
import AppContext from "@/store";
import { useCookieState } from "ahooks";
import { Button, Form, Input, Modal, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import { tasksApi } from "idl";
import { User } from "idl/dist/idl/taskComponents";
import { useState } from "react";
import { useContainer } from "unstated-next";

const User = () => {
  const { showLogin, setShowLogin, setJwt } = useContainer(AppContext);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (values: User) => {
    setIsLoading(true);
    const api = isLogin ? tasksApi.login : tasksApi.register;
    api(values)
      .then((res) => {
        if (res.status != UserStatus.Success) {
          return Promise.reject(res.status);
        }
        setJwt(res.user?.jwt || "");
        message.success((isLogin ? "Login" : "Register") + " Success.");
        setTimeout(() => {
          location.href = "/admin/dashboard";
        }, 5e2);
      })
      .catch((e) => {
        console.log(e);
        message.error("Something wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <Modal open={showLogin} footer={false} onCancel={() => setShowLogin(false)}>
      <Form onFinish={handleSubmit} className="m-6">
        <FormItem label="Username" name="username">
          <Input></Input>
        </FormItem>
        <FormItem label="Password" name="password">
          <Input></Input>
        </FormItem>
        <Button loading={isLoading} htmlType="submit">
          {isLogin ? "Login" : "Register"}
        </Button>
      </Form>
      <Button type="text" onClick={() => setIsLogin((val) => !val)}>
        {isLogin ? "Register?" : "Login?"}
      </Button>
    </Modal>
  );
};

export default User;
