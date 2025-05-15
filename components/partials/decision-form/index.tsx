"use client";

import { ArrowRight, Emojis } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import { useStep } from "usehooks-ts";
import { useForm, Controller } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import SubmitIcon from "@/components/icons/SubmitIcon";

type FormData = {
  oathStatement: string;
  decisionReflection: string;
  resistanceResponse: string;
};

const DecisionForm = () => {
  const [currentStep, helpers] = useStep(4);
  const { setStep } = helpers;
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [formData, setFormData] = useState<Partial<FormData>>({});

  const { control, handleSubmit, watch, getValues } = useForm<FormData>({
    defaultValues: {
      oathStatement: "",
      decisionReflection: "",
      resistanceResponse: "",
    },
  });

  const currentFieldValue = watch(
    currentStep === 1
      ? "oathStatement"
      : currentStep === 2
      ? "decisionReflection"
      : "resistanceResponse"
  );

  const handleNextStep = () => {
    // Save current step data before proceeding
    const values = getValues();
    setFormData((prev) => ({
      ...prev,
      ...(currentStep === 1 && { oathStatement: values.oathStatement }),
      ...(currentStep === 2 && {
        decisionReflection: values.decisionReflection,
      }),
      ...(currentStep === 3 && {
        resistanceResponse: values.resistanceResponse,
      }),
    }));

    setDirection("right");
    setStep(currentStep + 1);
  };

  const onSubmit = (data: FormData) => {
    // Combine all data for final submission
    const completeData = {
      ...formData,
      resistanceResponse: data.resistanceResponse,
    };

    console.log("Form submitted with data:", completeData);

    setStep(4); // Show summary
  };

  // Animation variants
  const variants = {
    enter: (direction: "left" | "right") => ({
      x: direction === "right" ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: "left" | "right") => ({
      x: direction === "right" ? -1000 : 1000,
      opacity: 0,
    }),
  };

  return (
    <div
      className={`min-h-[calc(100vh-104px)] flex flex-col items-center justify-center`}
    >
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentStep}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
          className="w-full max-w-[800px]"
        >
          {currentStep !== 4 && (
            <div className="bg-[#FAF4FF] rounded-4xl shadow-[0px_0px_0px_4px_#F6F1F9] p-8 border-4 border-white">
              <div className="flex justify-start items-center gap-2 mb-6 shrink-0">
                <Image
                  src="/notes.png"
                  alt="notes"
                  width={48}
                  height={48}
                  className="size-12 object-cover object-center aspect-square"
                />

                <h1 className="text-3xl font-bold text-slate-950">
                  {currentStep === 1 && "Please enter your oath statement"}
                  {currentStep === 2 &&
                    "Describe one decision you made today that reflects your personal values."}

                  {currentStep === 3 &&
                    "Where did you face resistance today, and how did you respond?"}
                </h1>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6 p-4 bg-white rounded-2xl">
                  <Controller
                    name={
                      currentStep === 1
                        ? "oathStatement"
                        : currentStep === 2
                        ? "decisionReflection"
                        : "resistanceResponse"
                    }
                    control={control}
                    render={({ field }) => (
                      <textarea
                        {...field}
                        className="w-full h-[84px] p-4 border-none rounded-lg mb-6 focus:outline-none text-slate-950 text-base font-semibold resize-none scroll-none overflow-hidden placeholder:text-slate-950 placeholder:text-base placeholder:font-semibold"
                        placeholder="Write here"
                      />
                    )}
                  />

                  <div className="w-full flex justify-between">
                    <div className="p-2 cursor-pointer shrink-0">
                      <Emojis className="size-6 text-slate-600" />
                    </div>

                    <Button
                      className="shrink-0"
                      size="lg"
                      type={currentStep === 3 ? "submit" : "button"}
                      disabled={!currentFieldValue}
                      onClick={currentStep !== 3 ? handleNextStep : undefined}
                    >
                      {currentStep === 3 ? "Submit" : "Next"}
                      {currentStep === 3 ? (
                        <SubmitIcon className="size-6 ml-2" />
                      ) : (
                        <ArrowRight className="size-6 ml-2" />
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          )}
          {currentStep === 4 && (
            <div className="bg-[#FAF4FF] rounded-4xl shadow-[0px_0px_0px_4px_#F6F1F9] p-8 border-4 border-white">
              <div className="flex gap-6 items-center mb-6">
                <Image
                  src="/sparkle.svg"
                  alt="sparkle"
                  width={64}
                  height={64}
                  className="size-16 object-cover object-center aspect-square"
                />
                <h2 className="text-[40px] leading-12 font-extrabold text-slate-950">
                  Today’s Reflection Summary
                </h2>
              </div>
              <div className="p-4 bg-white rounded-2xl flex flex-col gap-2 mb-4">
                <div className="flex gap-2 items-center">
                  <Image
                    src="/fast-charging.svg"
                    alt="fast charging"
                    width={32}
                    height={32}
                    className="size-8 object-cover object-center aspect-square"
                  />
                  <h5 className="text-2xl font-semibold text-slate-950">
                    Alignment Score
                  </h5>
                </div>
                <div className="bg-slate-100 rounded-xl h-16 relative">
                  <div className="bg-gradient-to-r from-[#B4FFB7] to-[#58DF5C] rounded-xl h-full w-4/5"></div>
                  <div className="text-3xl font-bold text-slate-950 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    80/100
                  </div>
                </div>
              </div>
              <div className="p-4 bg-white rounded-2xl flex flex-col gap-2 mb-4">
                <div className="flex gap-2 items-center">
                  <Image
                    src="/summary.svg"
                    alt="Summary"
                    width={32}
                    height={32}
                    className="size-8 object-cover object-center aspect-square"
                  />
                  <h5 className="text-2xl font-semibold text-slate-950">
                    Summary
                  </h5>
                </div>
                <p className="text-2xl font-semibold text-slate-950">
                  You showed consistent alignment with your stated values.
                </p>
              </div>
              <div className="p-4 bg-white rounded-2xl flex flex-col gap-2 mb-4">
                <div className="flex gap-2 items-center">
                  <Image
                    src="/flag.svg"
                    alt="Flag"
                    width={32}
                    height={32}
                    className="size-8 object-cover object-center aspect-square"
                  />
                  <h5 className="text-2xl font-semibold text-slate-950">
                    Flag
                  </h5>
                </div>
                <p className="text-2xl font-semibold text-slate-950">
                  Mild defensiveness noted in response to emotional resistance.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default DecisionForm;
