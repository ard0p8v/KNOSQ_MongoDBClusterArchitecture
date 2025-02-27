import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

df = pd.read_csv('titanic_passengers.csv', on_bad_lines='skip')

print("Základní informace o datech:")
print(df.info())

print("\nZákladní statistiky:")
print(df.describe())

print("\nPohled na data:")
print(df.head())

print("\nPočet prázdných polí v každém sloupci:")
print(df.isnull().sum())

numeric_df = df.select_dtypes(include=[np.number])
print("\nSumy a průměry pro číselné sloupce:")
print("Suma:")
print(numeric_df.sum())
print("Průměr:")
print(numeric_df.mean())

print("\nGrafické zobrazení dat:")
numeric_df.hist(figsize=(10, 8), color='#009fdf')
plt.tight_layout()
plt.show()

corr_matrix = numeric_df.corr()
print("\nKorelační matice:")
print(corr_matrix)

plt.figure(figsize=(10, 8))
plt.title('Heatmap korelační matice')
sns.heatmap(corr_matrix, annot=True, cmap='coolwarm', linewidths=.5)
plt.show()

numeric_df = df.select_dtypes(include=[np.number])
plt.figure(figsize=(15, 10))
numeric_df.plot(kind='box', subplots=True, layout=(4, 3), sharex=False, sharey=False, color=dict(boxes='#009fdf', whiskers='#009fdf', medians='#009fdf', caps='#009fdf'))
plt.tight_layout()
plt.show()