console.log("Open settings page");

let carparks = [];

carparks.push({ name: "Hong Lim", number: "HLM" });
carparks.push({ name: "Tanjung Pagar", number: "TPM" });
carparks.push({ name: "Spottiswood", number: "SPM" });

function appSettings(prop) {
  return (
    <Page>
      <Section title={<Text bold align="center">Carparks</Text>}>
        <AdditiveList
          title="Select your carparks"
          settingsKey="selected_carparks"
          maxItems="3"
          addAction={
            <TextInput
              title="Add a carpark"
              label="Name"
              placeholder="Type something"
              action="Add Carpark"
              onAutocomplete={
                (value) => {
                  return carparks.filter((option) => {
                    return option.name.toLowerCase().startsWith(value.toLowerCase());
                  });
                }
              }
            />
          }
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(appSettings);
