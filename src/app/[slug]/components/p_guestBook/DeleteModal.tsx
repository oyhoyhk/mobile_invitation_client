import styled from "@emotion/styled";

export default function DeleteModal({
  id,
  idx,
  setList,
  setDeleteModal,
}: {
  id: string;
  idx: number;
  setList: React.Dispatch<
    React.SetStateAction<
      {
        idx: number;
        name: string;
        createdAt: string;
        title: string;
      }[]
    >
  >;
  setDeleteModal: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
    };
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_IMAGE_URL}api/guestBook`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            idx,
            password: target.name.value,
          }),
        }
      );
      if (res.status === 400) {
        alert("비밀번호가 틀렸습니다.");
        return;
      }
      setDeleteModal(null);
      setList((prev) => prev.filter((info) => info.idx !== idx));
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Container onSubmit={onSubmit}>
      <Header>
        <div />
        <div>방명록 삭제</div>
        <div onClick={() => setDeleteModal(null)}>×</div>
      </Header>
      <InputContainer>
        <label htmlFor="delete_id">비밀번호</label>
        <input
          type="password"
          id="delete_id"
          name="name"
          placeholder="비밀번호"
        />
      </InputContainer>
      <Button type="submit">삭제하기</Button>
    </Container>
  );
}

const InputContainer = styled.div`
  width: 274px;
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
  width: 310px;
  height: 210px;
  box-shadow: 0px 1px 10px 0px #0000001f;

  box-shadow: 0px 4px 5px 0px #00000024;

  box-shadow: 0px 2px 4px -1px #00000033;

  position: fixed;
  left: 50%;
  top: 50%;
  background: white;
  transform: translate(-50%, -50%);
  z-index: 4;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;
