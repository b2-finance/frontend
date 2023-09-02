export default function LedgerPage() {
  const accounts = [];
  for (let i = 0; i < 32; i++) {
    accounts.push('acct' + i);
  }
  return (
    <div className="grow flex w-full basis-0 overflow-hidden">
      <div className="flex flex-col w-64 p-8 overflow-y-auto bg-secondary">
        Accounts
        <ul>
          {accounts.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </div>
      <div className="grow flex flex-col items-center p-8 bg-accent ">
        Ledger
      </div>
    </div>
  );
}
