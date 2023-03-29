import inquirer from 'inquirer';
import postman from 'postman-collection';
import { Arguments, CommandBuilder } from 'yargs';
import { handler as defaultStopHandler } from '../generated-commands/time-entries/stop';
import { request as updateRequest } from '../generated-commands/time-entries/update';
import { getConfig } from '../utils/config';
import { httpRequest } from '../utils/postman-request-command';
import spinner from '../utils/spinner';
import { getNotes, getRunningTimer } from '../utils/timer';

export type StopTimerArguments = Arguments & {
  editor?: boolean;
  notes?: string;
  overwrite?: boolean;
};

export const command = 'stop';
export const describe = 'Stop a running time entry';

export const builder: CommandBuilder = (yargs) => {
  return yargs
    .options({
      editor: {
        alias: 'e',
        description: 'Launch editor to add notes',
        type: 'boolean',
      },
      notes: {
        alias: 'n',
        description: 'Any notes to be associated with the time entry',
        type: 'string',
      },
      overwrite: {
        alias: 'o',
        describe: 'Overwrite existing notes',
        type: 'boolean',
      },
    })
    .version(false);
};

export const handler = async (args: StopTimerArguments): Promise<void> => {
  const config = await getConfig();

  const answers = await inquirer.prompt([
    {
      name: 'account_id',
      type: 'list',
      message: 'Select an account:',
      choices: Object.entries(config.accountIds).map((el) => {
        return { name: el[0], value: el[1] };
      }),

      when: !args.account_id,
    },
  ]);

  Object.assign(args, answers);

  const timer = await getRunningTimer(
    'You have multiple timers running! Which timer do you want to stop?',
    answers.account_id
  );
  if (timer) {
    const notes = await getNotes(args, timer.notes);

    if (notes.length) {
      await spinner(async () =>
        httpRequest(
          updateRequest.method,
          new postman.Url(updateRequest.url),
          args?.account_id as string,
          {
            notes,
            time_entry_id: timer.id,
          }
        )
      );
    }

    await defaultStopHandler(
      Object.assign(
        {
          fields:
            'client.name,hours,id,is_running,notes,project.name,spent_date,task.name',
        },
        args,
        { time_entry_id: timer.id }
      )
    );
  }
};
