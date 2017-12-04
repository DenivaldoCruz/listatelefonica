from pyspark import SparkContext
from pyspark.sql import SparkSession
#from pyspark import Row
import time

start_time = time.time()
# coding: utf-8

# In[2]:


spark = SparkSession.builder.appName("Python Spark SQL Compras").config("spark.some.config.option", "some-value").getOrCreate()


# In[16]:


# spark is an existing SparkSession
df = spark.read.format("csv").option("header", "true").option("delimiter", ";").load("compras.txt.bz2")


# In[17]:


# In[23]:


# Creates a temporary view using the DataFrame
df.createOrReplaceTempView("Compras")


# In[29]:


# SQL can be run over DataFrames that have been registered as a table.
compras = spark.sql("SELECT Cidade FROM Compras")


# In[38]:


comprasAmex = spark.sql("SELECT * FROM Compras WHERE FormaPagto='Visa'")

# In[46]:


comprasAgrupadasPorCidadeEProduto = spark.sql("SELECT Cidade, Produto, SUM(Valor) AS Total FROM Compras GROUP BY Cidade, Produto ORDER BY Cidade, Total DESC")


# In[59]:


# Creates a temporary view using the DataFrame
comprasAgrupadasPorCidadeEProduto.createOrReplaceTempView("ComprasAgrupadas")


# In[88]:


produtosMaisVendidosPorCidade = spark.sql("SELECT Cidade, Produto, Total FROM ComprasAgrupadas T1 WHERE EXISTS (SELECT 1 AS Total FROM ComprasAgrupadas T2 WHERE T2.Cidade = T1.Cidade GROUP BY Cidade HAVING MAX(T2.Total) = T1.Total)")


# In[90]:


#produtosMaisVendidosPorCidade.show(100)


# In[91]:


produtosMaisVendidosPorCidade.coalesce(1).write.option("header", "true").csv("produto_mais_vendido_por_cidade_df")


end_time = time.time()

duration = end_time - start_time
print('Duration ', duration)
