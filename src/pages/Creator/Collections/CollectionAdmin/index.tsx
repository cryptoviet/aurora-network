import { Box, Center, Icon } from '@chakra-ui/react';
import AvatarCollaborators from 'components/Avatar/AvatarCollaborators';
import { useAppSelector } from 'hooks/useRedux';
import CollaboratorsMenu from 'layouts/Collaborators/CollaboratorsMenu';
import {
  TypeCollaboratorsRole,
  TypeCollaboratorsState,
} from 'layouts/Collaborators/CollaboratorsUtils';
import { useEffect, useState } from 'react';

import CollaboratorsRoleSwitch from 'layouts/Collaborators/CollaboratorsRoleSwitch';

import CloseIcon from 'public/assets/fill/close.svg';
import CollaboratorsAdd from 'layouts/Collaborators/CollaboratorsAdd';
import { UseFormSetValue } from 'react-hook-form';
import { CollectionsFieldProps } from '..';

interface CollectionAdminServiceProps {
  account: {
    address: string;
    name: string;
  };
  setValue: UseFormSetValue<CollectionsFieldProps>;
}

interface CollectionAdminProps {
  setValue: UseFormSetValue<CollectionsFieldProps>;
}

export default ({ setValue }: CollectionAdminProps) => {
  const { account } = useAppSelector(state => state.injected.polkadot);

  return (
    <>
      {account?.address && account.name && (
        <CollectionAdminService
          account={account as CollectionAdminServiceProps['account']}
          setValue={setValue}
        />
      )}
    </>
  );
};

function CollectionAdminService({
  account,
  setValue,
}: CollectionAdminServiceProps) {
  const options: TypeCollaboratorsRole[] = ['Admin', 'Freezer', 'Issuer'];

  const [collaborators, setCollaborators] = useState<TypeCollaboratorsState>([
    { role: 'Admin', account },
  ]);

  useEffect(() => {
    setValue(`collaborator`, collaborators);
  }, [collaborators]);

  const remove_collaborators = collaborators.length >= 2;
  const full_role = collaborators.length < 3;

  return (
    <>
      <Box>
        {collaborators.map(({ role, account }, index) => (
          <Center
            key={role}
            justifyContent="space-between"
            borderRadius="xl"
            bg="shader.a.900"
            position="relative"
            px={6}
            py={4}
            gap={2}
          >
            <AvatarCollaborators
              role={role}
              account={account}
              changeRole={
                <CollaboratorsRoleSwitch
                  options={options.filter(meta => meta !== role)}
                  role={role}
                  setCollaborators={setCollaborators}
                  index={index}
                />
              }
            />

            {remove_collaborators ? (
              <Icon
                as={CloseIcon}
                width={5}
                height={5}
                cursor="pointer"
                color="shader.a.400"
                position="absolute"
                inset="0 0 auto auto"
                transform="translate(25%, -25%)"
                onClick={() => {
                  setCollaborators(prev => {
                    const filter = prev.filter(meta => meta.role !== role);

                    return filter;
                  });
                }}
              />
            ) : null}

            <CollaboratorsMenu
              address={account.address}
              index={index}
              setCollaborators={setCollaborators}
            />
          </Center>
        ))}

        {full_role ? (
          <CollaboratorsAdd
            options={options}
            collaborators={collaborators}
            setCollaborators={setCollaborators}
            account={account}
          />
        ) : null}
      </Box>
    </>
  );
}
