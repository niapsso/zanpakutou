import type { NextPage } from "next";
import Head from "next/head";
import * as yup from "yup";
import { useForm, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormattedMessage } from "react-intl";

import useFormattedMessage from "../hooks/useFormattedMessage";

const Contact: NextPage = () => {
  const title = useFormattedMessage("page.contact.head.title");

  const description = useFormattedMessage("page.contact.head.meta.description");

  const schema = yup.object().shape({
    contact: yup
      .string()
      .email("field must be a valid email")
      .required("this field is required"),
    message: yup.string().required("this field is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const sendSubmission = async (data: FieldValues) => {
    console.log(data);

    // const res = await fetch("/api/mail", {
    //   headers: {
    //     Accept: "application/json",
    //     "Content-type": "application/json",
    //   },
    //   method: "POST",
    //   body: JSON.stringify(data),
    // })
    //   .then((res) => res.json())
    //   .catch(console.log);

    // console.log(res);
  };

  console.log(errors);

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form onSubmit={handleSubmit(sendSubmission)}>
        <input placeholder="Email" {...register("contact")} />
        <textarea
          placeholder={useFormattedMessage("page.contact.message-area")}
          {...register("message")}
        />
        <button type="submit">
          <FormattedMessage id="page.contact.send-btn" />
        </button>
      </form>
    </div>
  );
};

export default Contact;
