import Image from "next/image";
import Link from "next/link";

import styles from "@/styles/TechsList.module.scss";
import { Tech } from "@/utils/types";

interface TechsListProps {
  techs: Tech[];
  reverse?: boolean;
}

const TechsList = ({ techs, reverse = false }: TechsListProps) => {
  return (
    <div className={styles.techsList}>
      {[0, 1].map((x) => (
        <ul key={x} className={reverse ? styles.reverse : undefined}>
          {techs.length &&
            techs.map(({ _id: id, name, imgUrl, docUrl, skillLevel }) => (
              <li key={id}>
                <Link href={docUrl}>
                  <a>
                    <figure>
                      <Image
                        src={imgUrl}
                        alt={name + " logo"}
                        layout="fill"
                        objectFit="contain"
                      />
                    </figure>
                  </a>
                </Link>
                <div>
                  <span>
                    {name}
                    <br />
                    {skillLevel}
                  </span>
                </div>
              </li>
            ))}
        </ul>
      ))}
    </div>
  );
};

export default TechsList;
