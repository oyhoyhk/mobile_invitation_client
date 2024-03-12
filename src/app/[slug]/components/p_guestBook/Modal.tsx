import styled from "styled-components";

export default function Modal({
  id,
  setToggle,
}: {
  id: string;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
      password: { value: string };
      message: { value: string };
    };
    await fetch(`${process.env.NEXT_PUBLIC_IMAGE_URL}api/guestBook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        name: target.name.value,
        password: target.password.value,
        message: target.message.value,
      }),
    });
    setToggle(false);
  };
  return (
    <Container onSubmit={onSubmit}>
      <Header>
        <div />
        <div>참석의사 전달하기</div>
        <div onClick={() => setToggle(false)}>×</div>
      </Header>
      <InputContainer>
        <label htmlFor="guest_name">성함</label>
        <input type="text" id="guest_name" name="name" placeholder="성함" />
      </InputContainer>
      <InputContainer>
        <label htmlFor="guest_password">성함</label>
        <input
          type="password"
          id="guest_password"
          name="password"
          placeholder="비밀번호"
        />
      </InputContainer>
      <InputContainer style={{ alignItems: "flex-start" }}>
        <label htmlFor="guest_message">메시지</label>
        <textarea
          id="guest_message"
          name="message"
          placeholder="방명록 메시지"
        />
      </InputContainer>

      <Button type="submit">작성하기</Button>
    </Container>
  );
}

const InputContainer = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;

  & > input {
    width: 75%;
    border: 1px solid #817a5e4d;
    text-align: center;
    border-radius: 8px;
    padding: 8px 16px;
    outline: none;
  }

  & > textarea {
    width: 75%;
    border: 1px solid #817a5e4d;
    text-align: center;
    border-radius: 8px;
    padding: 8px 16px;
    outline: none;
    resize: none;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: pre-line;
    height: 130px;

    &::placeholder {
      text-align: center;
      line-height: 110px;
    }
  }
`;

const Button = styled.button`
  border: 1px solid #817a5e4d;
  background: #f5e3e2;
  width: 274px;
  border-radius: 28px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 25px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px;
  border: 0.7px solid #817a5e4d;
  margin-bottom: 10px;

  & > div:nth-of-type(2) {
    font-weight: 700;
    font-size: 16px;
  }
  & > div:first-of-type {
    width: 12px;
  }
  & > div:last-of-type {
    font-size: 30px;
    cursor: pointer;
  }
`;

const Container = styled.form`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 310px;
  height: 400px;
  border-radius: 4px;
  box-shadow: 0px 1px 10px 0px #0000001f;
  box-shadow: 0px 4px 5px 0px #00000024;
  box-shadow: 0px 2px 4px -1px #00000033;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  background: white;
  z-index: 4;
`;
