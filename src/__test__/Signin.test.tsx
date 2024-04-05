//Signin.test.tsx
import userEvent from "@testing-library/user-event";
import { render, waitFor, screen } from "@testing-library/react";
import Signin from "../views/Signin";

//useNavigateをモック
const mockedNavigator = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigator,
}));

describe("Signin test", () => {
  test("未入力でログインボタン クリック", async () => {
    render(<Signin />);
    userEvent.click(screen.getByRole("button", { name: "ログイン" }));
    await waitFor(() =>
      expect(
        screen.getByText("ユーザーIDを入力してください。")
      ).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(
        screen.getByText("パスワードを入力してください。")
      ).toBeInTheDocument()
    );
  });

  test("ユーザーID:ひらがな入力", async () => {
    render(<Signin />);
    userEvent.type(
      screen.getByRole("textbox", { name: "ユーザーID" }),
      "あいうえお"
    );
    userEvent.click(screen.getByRole("button", { name: "ログイン" }));
    await waitFor(() =>
      expect(
        screen.getByText("ユーザーIDの形式が不正です。")
      ).toBeInTheDocument()
    );
  });

  test("不正なID/パス", async () => {
    render(<Signin />);
    userEvent.type(
      screen.getByRole("textbox", { name: "ユーザーID" }),
      "watanabe"
    );
    userEvent.type(
      screen.getByRole("password", { name: "パスワード" }),
      "aaaa"
    );
    userEvent.click(screen.getByRole("button", { name: "ログイン" }));
    await waitFor(() =>
      expect(
        screen.getByText("ユーザーIDもしくはパスワードが間違っています。")
      ).toBeInTheDocument()
    );
  });

  test("クリアボタン", async () => {
    render(<Signin />);
    userEvent.type(screen.getByRole("textbox", { name: "ユーザーID" }), "user");
    userEvent.type(
      screen.getByRole("password", { name: "パスワード" }),
      "password"
    );
    await userEvent.click(screen.getByRole("button", { name: "クリア" }));
    await userEvent.click(screen.getByRole("button", { name: "ログイン" }));
    await waitFor(() =>
      expect(
        screen.getByText("ユーザーIDを入力してください。")
      ).toBeInTheDocument()
    );
  });

  test("正しいID/パス", async () => {
    render(<Signin />);
    userEvent.type(screen.getByRole("textbox", { name: "ユーザーID" }), "user");
    userEvent.type(
      screen.getByRole("password", { name: "パスワード" }),
      "password"
    );
    userEvent.click(screen.getByRole("button", { name: "ログイン" }));
    await waitFor(() => expect(mockedNavigator).toHaveBeenCalledWith("/Top"));
  });
});
