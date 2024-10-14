"use client";

import SvgIcon from "@/components/Common/SvgIcon";
import { platformLinks } from "@/configs/platformLinks";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  profileLinks: ProfileLinks;
  delayCountMax?: number;
}

export default function MobileViewContent({
  profileLinks,
  delayCountMax,
}: Props) {
  const { profile, links = [] } = profileLinks || {};
  const { email, firstName, lastName, image } = profile || {};
  const fullName = firstName ? `${firstName} ${lastName}` : "";

  return (
    <div>
      <div className="mb-12 mt-8 flex flex-col items-center text-center sm:mb-16">
        {image ? (
          <div className="relative mb-6 h-32 w-32 rounded-full border-[3px] border-primary">
            <Image
              src={image}
              alt={fullName || "Profile"}
              fill
              className="rounded-full object-cover"
            />
          </div>
        ) : (
          <div className="mb-7 h-32 w-32 rounded-full bg-skeleton" />
        )}
        {fullName ? (
          <h3 className="text-lg font-semibold text-dark">{fullName}</h3>
        ) : (
          <div className="h-5 w-52 rounded-lg bg-skeleton" />
        )}
        {email ? (
          <h5 className="mt-3 text-sm">{email}</h5>
        ) : (
          <div className="mt-4 h-2.5 w-24 rounded-lg bg-skeleton" />
        )}
      </div>

      <div className="space-y-5 sm:space-y-6 sm:px-2">
        {links?.length === 0
          ? [...Array(5)].map((_, i) => (
              <div key={i} className="h-[3rem] w-full rounded-md bg-skeleton" />
            ))
          : links?.map(({ id, platformName, url }, index) => {
              const { name, bgColor, textColor } = platformLinks[platformName];

              return (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "tween",
                    delay: delayCountMax
                      ? index < delayCountMax
                        ? index * 0.1
                        : 0
                      : index * 0.1,
                  }}
                >
                  <Link
                    href={url}
                    target="_blank"
                    className="flex items-center justify-between rounded-lg border px-6 py-3 text-white transition hover:opacity-90"
                    style={{ backgroundColor: bgColor, color: textColor }}
                  >
                    <div className="flex items-center gap-2.5">
                      <SvgIcon
                        src={`/icons/${platformName}.svg`}
                        className="h-5 w-5"
                      />
                      <h5>{name}</h5>
                    </div>
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </motion.div>
              );
            })}
      </div>
    </div>
  );
}
