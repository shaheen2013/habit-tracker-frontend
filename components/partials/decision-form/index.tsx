"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useStep } from "usehooks-ts";
import { motion, AnimatePresence } from "framer-motion";

import Image from "next/image";

import { useEvaluateOathMutation } from "@/lib/api/evaluate.api";
import { FormData, responseType } from "./types";
import { variants } from "./constants";

import { ArrowRight, Emojis, Submit } from "@/components/icons";
import { Button } from "@/components/ui/button";
import ReflectionSummary from "@/components/partials/reflection-summary";
import { cn, countWords } from "@/lib/utils";

const DecisionForm = () => {
  const [reflectionData, setReflectionData] = useState<responseType | null>(
    null
  );
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [formData, setFormData] = useState<Partial<FormData>>({});

  const {
    control,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
    trigger,
  } = useForm<FormData>({
    defaultValues: {
      oathStatement: "",
      decisionReflection: "",
      resistanceResponse: "",
    },
    mode: "onChange",
  });

  const [evaluateOath, { isLoading }] = useEvaluateOathMutation();
  const [currentStep, helpers] = useStep(4);
  const { setStep } = helpers;

  const currentFieldValue = watch(
    currentStep === 1
      ? "oathStatement"
      : currentStep === 2
      ? "decisionReflection"
      : "resistanceResponse"
  );

  const handleNextStep = async () => {
    const fieldName =
      currentStep === 1
        ? "oathStatement"
        : currentStep === 2
        ? "decisionReflection"
        : "resistanceResponse";

    // Trigger validation for the current field
    const isValid = await trigger(fieldName);

    if (!isValid) return;

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

  const onSubmit = async (data: FormData) => {
    // Combine all data for final submission
    const payload = {
      oath: formData.oathStatement,
      answer1: data.decisionReflection,
      answer2: data.resistanceResponse,
    };

    setStep(4);

    try {
      const response = await evaluateOath(payload).unwrap();
      setReflectionData(response);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
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
                  <div className="relative">
                    <Controller
                      name={
                        currentStep === 1
                          ? "oathStatement"
                          : currentStep === 2
                          ? "decisionReflection"
                          : "resistanceResponse"
                      }
                      control={control}
                      rules={{
                        validate: {
                          required: (value) =>
                            !!value || "This field is required",
                          wordCount: (value) => {
                            const count = countWords(value || "");
                            if (currentStep === 1) {
                              return (
                                (count >= 1 && count <= 50) ||
                                "Must be 1-50 words"
                              );
                            } else {
                              return (
                                (count >= 20 && count <= 50) ||
                                "Must be 20-50 words"
                              );
                            }
                          },
                        },
                      }}
                      render={({ field }) => (
                        <textarea
                          {...field}
                          className={cn(
                            "w-full h-[84px] p-4 border rounded-lg mb-1 focus:outline-none text-slate-950 text-base font-semibold resize-none scroll-none overflow-hidden placeholder:text-slate-950 placeholder:text-base placeholder:font-semibold",
                            errors[field.name]
                              ? "border-red-500"
                              : "border-none"
                          )}
                          placeholder="Write here"
                        />
                      )}
                    />
                    <div className="flex justify-between items-center mt-1">
                      {errors[
                        currentStep === 1
                          ? "oathStatement"
                          : currentStep === 2
                          ? "decisionReflection"
                          : "resistanceResponse"
                      ] && (
                        <span className="text-red-500 text-sm">
                          {
                            errors[
                              currentStep === 1
                                ? "oathStatement"
                                : currentStep === 2
                                ? "decisionReflection"
                                : "resistanceResponse"
                            ]?.message
                          }
                        </span>
                      )}
                      <span className="text-sm text-gray-500 ml-auto">
                        {countWords(currentFieldValue || "")} words
                        {currentStep === 1 ? " (1-50)" : " (20-50)"}
                      </span>
                    </div>
                  </div>

                  <div className="w-full flex justify-between">
                    <div className="p-2 cursor-pointer shrink-0">
                      <Emojis className="size-6 text-slate-600" />
                    </div>

                    <Button
                      className="shrink-0"
                      size="lg"
                      type={currentStep === 3 ? "submit" : "button"}
                      disabled={
                        !currentFieldValue ||
                        !!errors[
                          currentStep === 1
                            ? "oathStatement"
                            : currentStep === 2
                            ? "decisionReflection"
                            : "resistanceResponse"
                        ]
                      }
                      onClick={currentStep !== 3 ? handleNextStep : undefined}
                    >
                      {currentStep === 3 ? "Submit" : "Next"}
                      {currentStep === 3 ? (
                        <Submit className="size-6 ml-2" />
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
            <ReflectionSummary
              reflectionData={reflectionData}
              loading={isLoading}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default DecisionForm;
